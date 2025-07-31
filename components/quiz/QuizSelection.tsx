'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Trophy } from 'lucide-react';

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

interface QuizSelectionProps {
  quizzes: Quiz[];
  onQuizSelect: (quiz: Quiz) => void;
}

export const QuizSelection: React.FC<QuizSelectionProps> = ({ quizzes, onQuizSelect }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    onQuizSelect(quiz);
  };

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Quizzes Available</h3>
        <p className="text-muted-foreground">
          Check back later for new quizzes, or contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Quiz</h2>
        <p className="text-muted-foreground text-lg">
          Select a quiz to test your knowledge and track your progress
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz, index) => (
          <Card 
            key={index} 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => handleQuizSelect(quiz)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {quiz.title}
                  </CardTitle>
                  {quiz.description && (
                    <CardDescription className="line-clamp-3">
                      {quiz.description}
                    </CardDescription>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {quiz.category && (
                  <Badge variant="secondary" className="text-xs">
                    {quiz.category}
                  </Badge>
                )}
                {quiz.difficulty && (
                  <Badge 
                    variant={
                      quiz.difficulty.toLowerCase() === 'easy' ? 'default' :
                      quiz.difficulty.toLowerCase() === 'medium' ? 'secondary' : 'destructive'
                    }
                    className="text-xs"
                  >
                    {quiz.difficulty}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{quiz.questions.length} questions</span>
                </div>
                {quiz.estimatedTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.estimatedTime} min</span>
                  </div>
                )}
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuizSelect(quiz);
                }}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
