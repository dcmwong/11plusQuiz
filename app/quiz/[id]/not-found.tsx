import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MascotAvatar } from '@/components/avatars/MascotAvatar';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center max-w-md mx-auto">
        <MascotAvatar size={120} />
        
        <h1 className="text-4xl font-bold text-primary mt-8 mb-4">Quiz Not Found</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the quiz you're looking for. It may have been removed or the link might be incorrect.
        </p>
        
        <div className="space-y-4">
          <Link href="/quiz-selection">
            <Button size="lg" className="w-full">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Quizzes
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
