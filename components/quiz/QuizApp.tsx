'use client';

import { useState } from 'react';
import { QuizSelection } from './QuizSelection';
import { QuizClient } from './QuizClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  id?: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  estimatedTime?: number;
  questions: Question[];
}

interface QuizAppProps {
  quizzes: Quiz[];
}

export const QuizApp: React.FC<QuizAppProps> = ({ quizzes }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleBackToSelection = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    return (
      <div className="w-full">
        <div className="flex justify-start mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToSelection}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quiz Selection
          </Button>
        </div>
        <QuizClient quizData={selectedQuiz} />
      </div>
    );
  }

  return <QuizSelection quizzes={quizzes} onQuizSelect={handleQuizSelect} />;
};
