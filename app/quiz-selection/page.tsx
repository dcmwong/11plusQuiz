import { QuizSelection } from '@/components/quiz/QuizSelection';
import { UserProfile } from '@/components/auth/UserProfile';
import { MascotAvatar } from '@/components/avatars/MascotAvatar';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/init';

const db = getFirestore(app);

async function getQuizData() {
  try {
    const quizCollection = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(quizCollection);
    const quizData = quizSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Convert any Timestamp objects to plain objects/strings
      const serializedData = JSON.parse(JSON.stringify(data));
      return { id: doc.id, ...serializedData };
    });
    return quizData;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    // Return empty array if Firebase fails
    return [];
  }
}

export default async function QuizSelectionPage() {
  const quizzes = await getQuizData();

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      {/* Header with user profile */}
      <div className="w-full max-w-6xl mx-auto flex justify-end mb-4">
        <UserProfile />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
            <MascotAvatar size={80} />
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-headline">Quiz Selection</h1>
              <p className="text-lg md:text-xl text-foreground/80 mt-2">Choose a quiz to start your learning journey!</p>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <QuizSelection quizzes={quizzes} />
          </div>
        </div>
      </div>
    </main>
  );
}
