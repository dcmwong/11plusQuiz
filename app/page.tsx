import { QuizClient } from '@/components/quiz/QuizClient';
import Image from 'next/image';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/init';

const db = getFirestore(app);

async function getQuizData() {
  try {
    const quizCollection = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(quizCollection);
    const quizData = quizSnapshot.docs.map(doc => doc.data());
    return quizData;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    // Return default quiz data if Firebase fails
    return [];
  }
}

export default async function Home() {
  const quizData = (await getQuizData())[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Image
            src="https://placehold.co/100x100.png"
            alt="Quiz Whiz mascot"
            width={100}
            height={100}
            className="rounded-full"
            data-ai-hint="cartoon brain"
          />
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary font-headline">
              Quiz Whiz
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mt-2">
              Test your knowledge and get smart feedback!
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
          <QuizClient quizData={quizData} />
        </div>
      </div>
    </main>
  );
}
