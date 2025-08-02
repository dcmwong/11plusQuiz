
'use client';

import type { FC } from 'react';
import { CheckCircle2, XCircle, BrainCircuit, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface ResultsCardProps {
  questions: Question[];
  answers: Record<number, string>;
  score: number;
  feedback: string;
  onRestart: () => void;
}

export const ResultsCard: FC<ResultsCardProps> = ({
  questions,
  answers,
  score,
  feedback,
  onRestart,
}) => {
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-500';
    if (scorePercentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl border-4 border-primary/20 animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="text-center items-center">
        <CardDescription className="text-xl font-semibold text-primary">Quiz Complete!</CardDescription>
        <CardTitle className="text-4xl font-bold !mt-2">Your Results</CardTitle>
        <div className="my-6">
          <p className="text-2xl">You scored</p>
          <p className={`text-7xl font-extrabold ${getScoreColor()}`}>
            {score} / {totalQuestions}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
          <h3 className="text-2xl font-bold text-primary flex items-center mb-3">
            <BrainCircuit className="w-8 h-8 mr-3" />
            Personalized Feedback
          </h3>
          <p className="text-lg whitespace-pre-wrap font-sans">{feedback}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-center mb-4">Review Your Answers</h3>
          <Accordion type="single" collapsible className="w-full">
            {questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg hover:no-underline">
                    <div className="flex items-center">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 mr-3 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 mr-3 text-red-500" />
                      )}
                      <span className="text-left">{q.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-muted/50 rounded-md space-y-2 text-base">
                    <p><strong>Your Answer:</strong> <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswer || 'Not answered'}</span></p>
                    {!isCorrect && <p><strong>Correct Answer:</strong> <span className="text-green-600">{q.correctAnswer}</span></p>}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </CardContent>
      <CardFooter className="justify-center space-x-4">
        <Button onClick={onRestart} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-bold py-6 px-8">
          Play Again
        </Button>
        <Link href="/quiz-selection">
          <Button variant="outline" size="lg" className="text-xl font-bold py-6 px-8">
            <BookOpen className="mr-2 h-5 w-5" />
            Try Another Quiz
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
