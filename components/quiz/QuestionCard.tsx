
'use client';

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  isSubmitting: boolean;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  isSubmitting,
}) => {
  const progressValue = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-4 border-primary/20 animate-in fade-in zoom-in-95 duration-500">
      <CardHeader>
        <Progress value={progressValue} className="mb-4 h-3 bg-primary/20" />
        <CardDescription className="text-lg font-semibold text-primary">
          Question {questionIndex + 1} of {totalQuestions}
        </CardDescription>
        <CardTitle className="text-2xl md:text-3xl font-bold !mt-2">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer}
          onValueChange={onAnswerSelect}
          className="space-y-4"
          disabled={isSubmitting}
        >
          {question.options.map((option, index) => (
            <Label
              key={index}
              htmlFor={`option-${index}`}
              className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedAnswer === option
                  ? 'bg-primary/10 border-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <RadioGroupItem value={option} id={`option-${index}`} className="w-6 h-6 mr-4" />
              <span className="text-lg font-medium">{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
