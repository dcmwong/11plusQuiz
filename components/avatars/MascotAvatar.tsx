'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { getAvatarById } from './AvatarData';

interface MascotAvatarProps {
  className?: string;
  size?: number;
}

export function MascotAvatar({ className = "rounded-full", size = 100 }: MascotAvatarProps) {
  const { user } = useAuth();
  
  // Default to cat-orange if no user or no custom avatar
  let avatarId = 'cat-orange';
  
  if (user?.photoURL?.includes('avatar-')) {
    avatarId = user.photoURL.replace('avatar-', '');
  }
  
  const avatar = getAvatarById(avatarId);
  
  if (!avatar) {
    return (
      <div 
        className={`${className} bg-primary/10 flex items-center justify-center`}
        style={{ width: size, height: size }}
      >
        <span className="text-2xl">🧠</span>
      </div>
    );
  }
  
  return (
    <div 
      className={`${className} bg-primary/10 flex items-center justify-center overflow-hidden`}
      style={{ width: size, height: size }}
    >
      {avatar.svg}
    </div>
  );
}
