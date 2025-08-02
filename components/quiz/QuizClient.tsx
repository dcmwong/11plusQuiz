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
import {
  createQuizSession,
  saveQuizAnswer,
  completeQuizSession,
  selectQuestions,
  markQuestionsAsAnswered,
  getUserQuizProgress,
} from '@/lib/firebase/quizService';
import { useAuth } from '@/lib/auth/AuthContext';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  originalIndex?: number; // Track original index for progress tracking
}

interface QuizData {
  id?: string;
  title: string;
  questions: Question[];
}

interface QuizClientProps {
  quizData: QuizData;
}

export const QuizClient: FC<QuizClientProps> = ({ quizData }) => {
  const { title, questions: allQuestions, id } = quizData;
  const { toast } = useToast();
  const { user } = useAuth();

  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(true);
  const [isSavingAnswer, setIsSavingAnswer] = useState(false);
  const [isSelectingQuestions, setIsSelectingQuestions] = useState(true);

  // Use selected questions for the quiz, fallback to all questions if not set
  const questions = selectedQuestions.length > 0 ? selectedQuestions : allQuestions;
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Select questions when component mounts
  useEffect(() => {
    const setupQuiz = async () => {
      if (!user) {
        console.log('⏳ No user yet, waiting...');
        return;
      }

      if (!id) {
        console.log('⚠️ No quiz ID provided, using all questions');
        // If no quiz ID, use all questions (fallback mode)
        setSelectedQuestions(allQuestions.slice(0, 10)); // Still limit to 10 for consistency
        setSelectedIndices(allQuestions.slice(0, 10).map((_, index) => index));
        setIsSelectingQuestions(false);
        return;
      }

      try {
        console.log('📝 Selecting questions for quiz:', id, 'user:', user.uid);
        console.log('📊 Total questions available:', allQuestions.length);
        
        const questionSelection = await selectQuestions(user.uid, id, allQuestions, 10);
        setSelectedQuestions(questionSelection.selectedQuestions);
        setSelectedIndices(questionSelection.selectedIndices);

        // Get progress info for toast
        const progress = await getUserQuizProgress(user.uid, id);
        const answeredCount = progress?.answeredQuestionIndices?.length || 0;
        const totalQuestions = allQuestions.length;

        console.log('✅ Question selection completed:', {
          selected: questionSelection.selectedQuestions.length,
          answered: answeredCount,
          total: totalQuestions,
          selectedIndices: questionSelection.selectedIndices
        });

        toast({
          title: 'Questions Selected!', 
          description: `Selected ${questionSelection.selectedQuestions.length} new questions. You've completed ${answeredCount}/${totalQuestions} total questions.`,
        });
      } catch (error) {
        console.error('❌ Failed to select questions:', error);
        // Fallback to first 10 questions if selection fails
        const fallbackQuestions = allQuestions.slice(0, 10);
        setSelectedQuestions(fallbackQuestions);
        setSelectedIndices(fallbackQuestions.map((_, index) => index));
        toast({
          title: 'Notice',
          description: 'Using first 10 questions as question selection failed.',
          variant: 'default',
        });
      } finally {
        setIsSelectingQuestions(false);
      }
    };

    if (user && allQuestions.length > 0) {
      setupQuiz();
    }
  }, [user, id, allQuestions, toast]);

  // Create quiz session when questions are selected
  useEffect(() => {
    const initializeSession = async () => {
      if (!user) return;

      try {
        const newSessionId = await createQuizSession(user.uid, 'quiz-' + Date.now(), title, questions.length);
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
  }, [user, title, questions.length, toast]);

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
    setLoadingFeedback(true);

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
          await completeQuizSession(
            sessionId,
            id || 'quiz-' + Date.now(),
            title,
            answers,
            questions,
            calculatedScore,
            feedback, // Pass the feedback parameter
          );

          // Mark questions as answered for progress tracking
          if (user && id && selectedIndices.length > 0) {
            await markQuestionsAsAnswered(user.uid, id, title, selectedIndices);
            console.log('✅ Marked questions as answered for progress tracking');
          }

          toast({
            title: 'Quiz Completed!',
            description: 'Your results have been saved and progress updated.',
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
      setLoadingFeedback(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setScore(0);
    setFeedback('');
  };

  if (isSelectingQuestions || !user) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {!user ? 'Loading...' : 'Selecting Questions'}
        </h3>
        <p className="text-muted-foreground text-center">
          {!user 
            ? 'Please wait while we set up your quiz...' 
            : 'We\'re preparing 10 personalized questions for you based on your progress...'
          }
        </p>
      </div>
    );
  }

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
