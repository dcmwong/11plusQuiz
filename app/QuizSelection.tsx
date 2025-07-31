import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/init';
import { Button } from '@/components/ui/button';

// Initialize Firestore
const db = getFirestore(app);

interface Quiz {
  id: string;
  title: string;
}

const fetchQuizzes = async (): Promise<Quiz[]> => {
  try {
    const quizCollection = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(quizCollection);
    return quizSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Quiz[];
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
};

export default function QuizSelection() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getQuizzes = async () => {
      const quizzes = await fetchQuizzes();
      setQuizzes(quizzes);
    };
    getQuizzes();
  }, []);

  const handleQuizSelect = (id: string) => {
    router.push(`/quiz/${id}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-8">Select a Quiz</h1>
        {quizzes.length === 0 ? (
          <p>Loading quizzes...</p>
        ) : (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="mb-4">
                <Button onClick={() => handleQuizSelect(quiz.id)} size="lg" className="w-full">
                  {quiz.title}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
