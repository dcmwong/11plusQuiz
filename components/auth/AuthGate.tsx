'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { Loader2 } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="w-full max-w-md">
          {isSignUp ? (
            <SignUpForm onToggleMode={() => setIsSignUp(false)} />
          ) : (
            <LoginForm onToggleMode={() => setIsSignUp(true)} />
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
