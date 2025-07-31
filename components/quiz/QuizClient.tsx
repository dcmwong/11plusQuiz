'use client';

import { useState, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import { getFeedback } from '@/app/actions';
import type { FeedbackInput } from '@/ai/flows/personalized-feedback';
import { QuestionCard } from './QuestionCard';
import { ResultsCard } from './ResultsCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { createQuizSession, saveQuizAnswer, completeQuizSession } from '@/lib/firebase/quizService';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  title: string;
  questions: Question[];
}

interface QuizClientProps {
  quizData: QuizData;
}

export const QuizClient: FC<QuizClientProps> = ({ quizData }) => {
  const { title, questions } = quizData;
  const { toast } = useToast();

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(true);
  const [isSavingAnswer, setIsSavingAnswer] = useState(false);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Create quiz session when component mounts
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const newSessionId = await createQuizSession('quiz-' + Date.now(), title, questions.length);
        setSessionId(newSessionId);
        setIsCreatingSession(false);
        toast({
          title: 'Quiz Started!',
          description: 'Your progress will be automatically saved.',
        });
      } catch (error) {
        console.error('Failed to create session:', error);
        toast({
          title: 'Warning',
          description: 'Could not create session. Your progress may not be saved.',
          variant: 'destructive',
        });
        setIsCreatingSession(false);
      }
    };

    initializeSession();
  }, [title, questions.length, toast]);

  // Save answer immediately when selected (debounced to avoid excessive saves)
  useEffect(() => {
    const saveAnswer = async () => {
      if (sessionId && answers[currentQuestionIndex] && currentQuestion) {
        try {
          await saveQuizAnswer(
            sessionId,
            currentQuestionIndex,
            currentQuestion.question,
            answers[currentQuestionIndex],
            currentQuestion.correctAnswer,
          );
          console.log(`✅ Auto-saved answer for question ${currentQuestionIndex + 1}`);
        } catch (error) {
          console.error('Failed to auto-save answer:', error);
        }
      }
    };

    // Debounce the save to avoid excessive calls
    const timeoutId = setTimeout(saveAnswer, 500);
    return () => clearTimeout(timeoutId);
  }, [answers[currentQuestionIndex], sessionId, currentQuestion]);

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = async () => {
    if (!isLastQuestion && sessionId && answers[currentQuestionIndex] && currentQuestion) {
      setIsSavingAnswer(true);
      try {
        // Ensure the current answer is saved before moving to next question
        await saveQuizAnswer(
          sessionId,
          currentQuestionIndex,
          currentQuestion.question,
          answers[currentQuestionIndex],
          currentQuestion.correctAnswer,
        );
        setCurrentQuestionIndex((prev) => prev + 1);
      } catch (error) {
        console.error('Failed to save answer before navigation:', error);
        toast({
          title: 'Save Error',
          description: 'Could not save your answer. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSavingAnswer(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    // setLoadingFeedback(true);

    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);

    const feedbackInput: FeedbackInput = {
      quizName: title,
      questions: questions.map((q, index) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: answers[index] || 'Not answered',
      })),
    };

    try {
      // const result = await getFeedback(feedbackInput);
      // setFeedback(result.feedback);

      // Save complete quiz results to database
      if (sessionId) {
        try {
          await completeQuizSession(sessionId, 'quiz-' + Date.now(), title, answers, questions, calculatedScore);
          toast({
            title: 'Quiz Completed!',
            description: 'Your results have been saved successfully.',
          });
        } catch (error) {
          console.error('Failed to save quiz results:', error);
          toast({
            title: 'Warning',
            description: 'Quiz completed but results could not be saved.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Could not generate feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsFinished(true);
      // setLoadingFeedback(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setScore(0);
    setFeedback('');
  };

  if (isFinished) {
    return <ResultsCard questions={questions} answers={answers} score={score} feedback={feedback} onRestart={handleRestart} />;
  }

  return (
    <div className="w-full">
      <div key={currentQuestionIndex}>
        <QuestionCard
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          isSubmitting={loadingFeedback}
        />
      </div>

      <div className="flex justify-between mt-8 max-w-2xl mx-auto">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0 || loadingFeedback} variant="outline" size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleFinish}
            disabled={loadingFeedback || !answers[currentQuestionIndex]}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {loadingFeedback ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Results...
              </>
            ) : (
              'Finish Quiz'
            )}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={loadingFeedback || isSavingAnswer || !answers[currentQuestionIndex]} size="lg">
            {isSavingAnswer ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
