'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useEffect, useState } from 'react';
import { getUserQuizResults, getUserQuizStats, QuizResult } from '@/lib/firebase/quizService';
import { testFirestoreConnection, testUserData } from '@/lib/firebase/debug';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/auth/UserProfile';
import { ArrowLeft, Trophy, Clock, Target, BarChart3, Bug } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ResultsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalTimePlayed: 0,
    bestScore: null as QuizResult | null
  });
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) {
        console.log('❌ No user ID available');
        return;
      }

      try {
        console.log('🔄 Starting to fetch user data for:', user.uid);
        setLoading(true);
        
        console.log('📊 Fetching user results...');
        const userResults = await getUserQuizResults(user.uid);
        console.log('✅ Got user results:', userResults);
        
        console.log('📈 Fetching user stats...');
        const userStats = await getUserQuizStats(user.uid);
        console.log('✅ Got user stats:', userStats);
        
        setResults(userResults);
        setStats(userStats);
        
        console.log('🎉 Successfully loaded user data');
      } catch (error) {
        console.error('❌ Error fetching user data:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          stack: error.stack
        });
        toast({
          title: 'Error',
          description: `Failed to load your quiz results: ${error.message}`,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      console.log('🚀 Auth loaded, user available:', user.uid);
      fetchUserData();
    } else if (!authLoading && !user) {
      console.log('❌ Auth loaded, no user');
      setLoading(false);
    } else {
      console.log('⏳ Auth still loading...');
    }
  }, [user, authLoading, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const runDebugTests = async () => {
    if (!user?.uid) return;
    
    try {
      console.log('🐛 Running debug tests...');
      setDebugMode(true);
      
      // Test general Firestore connection
      await testFirestoreConnection();
      
      // Test specific user data
      await testUserData(user.uid);
      
      toast({
        title: 'Debug Complete',
        description: 'Check the browser console for detailed logs.',
      });
    } catch (error) {
      console.error('Debug test failed:', error);
      toast({
        title: 'Debug Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDebugMode(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto flex justify-end mb-4">
          <UserProfile />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col p-4 md:p-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your results</h1>
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col p-4 md:p-8">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <UserProfile />
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Quiz Results</h1>
          <p className="text-muted-foreground">
            Track your progress and see how you're improving over time
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No quiz results yet</h2>
            <p className="text-muted-foreground mb-4">
              Take your first quiz to see your results here!
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/">
                <Button>Start a Quiz</Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={runDebugTests}
                disabled={debugMode}
              >
                {debugMode ? (
                  <>Debugging...</>
                ) : (
                  <>
                    <Bug className="mr-2 h-4 w-4" />
                    Debug
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageScore}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Played</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatTime(stats.totalTimePlayed)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Best Score</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.bestScore ? `${stats.bestScore.percentage}%` : 'N/A'}
                  </div>
                  {stats.bestScore && (
                    <p className="text-xs text-muted-foreground">
                      {stats.bestScore.quizTitle}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Results</h2>
              {results.map((result) => (
                <Card key={result.sessionId} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{result.quizTitle}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(result.timeTaken)}
                          </span>
                          <span>
                            {result.completedAt.toDate().toLocaleDateString()} at{' '}
                            {result.completedAt.toDate().toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Score</div>
                          <div className="font-semibold">
                            {result.score}/{result.totalQuestions}
                          </div>
                        </div>
                        
                        <Badge 
                          className={`${getScoreColor(result.percentage)} text-white`}
                        >
                          {result.percentage}%
                        </Badge>
                      </div>
                    </div>
                    
                    {result.feedback && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm">{result.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
