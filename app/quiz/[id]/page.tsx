import { QuizClient } from '@/components/quiz/QuizClient';
import { UserProfile } from '@/components/auth/UserProfile';
import { collection, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase/init';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const db = getFirestore(app);

async function getQuizById(id: string) {
  try {
    // First try to get from Firestore
    const quizDoc = doc(db, 'quizzes', id);
    const quizSnapshot = await getDoc(quizDoc);
    
    if (quizSnapshot.exists()) {
      const data = quizSnapshot.data();
      const serializedData = JSON.parse(JSON.stringify(data));
      return { id: quizSnapshot.id, ...serializedData };
    }

    // If not found in Firestore, try to get from all quizzes
    const quizCollection = collection(db, 'quizzes');
    const allQuizzesSnapshot = await getDocs(quizCollection);
    
    for (const doc of allQuizzesSnapshot.docs) {
      const data = doc.data();
      if (data.id === id || doc.id === id) {
        const serializedData = JSON.parse(JSON.stringify(data));
        return { id: doc.id, ...serializedData };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function QuizPage({ params }: PageProps) {
  const quiz = await getQuizById(params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      {/* Header with user profile and back button */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center mb-6">
        <Link href="/quiz-selection">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Quiz Selection
          </Button>
        </Link>
        <UserProfile />
      </div>

      {/* Quiz Title */}
      <div className="w-full max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{quiz.title}</h1>
        {quiz.description && (
          <p className="text-lg text-muted-foreground">{quiz.description}</p>
        )}
        <div className="flex justify-center items-center gap-4 mt-4">
          {quiz.category && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
              {quiz.category}
            </span>
          )}
          {quiz.difficulty && (
            <span className={`px-3 py-1 rounded-full text-sm ${
              quiz.difficulty.toLowerCase() === 'easy' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : quiz.difficulty.toLowerCase() === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {quiz.difficulty}
            </span>
          )}
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {quiz.questions.length} questions
          </span>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <QuizClient quizData={quiz} />
        </div>
      </div>
    </main>
  );
}
