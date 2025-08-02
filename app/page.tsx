import { UserProfile } from '@/components/auth/UserProfile';
import { MascotAvatar } from '@/components/avatars/MascotAvatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Trophy, Brain, Target } from 'lucide-react';

export default function Home() {
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
            <MascotAvatar size={120} />
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary font-headline">Quiz Whiz</h1>
              <p className="text-xl md:text-2xl text-foreground/80 mt-2">Test your knowledge and get smart feedback!</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Learning</h3>
              <p className="text-muted-foreground text-center">Personalized questions based on your progress</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground text-center">Track your learning journey with detailed progress</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Focused Sessions</h3>
              <p className="text-muted-foreground text-center">10 carefully selected questions per session</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Link href="/quiz-selection">
              <Button size="lg" className="text-lg px-8 py-4">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <p className="text-muted-foreground">Choose from our collection of 11+ exam practice quizzes</p>
          </div>
        </div>
      </div>
    </main>
  );
}
