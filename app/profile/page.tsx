'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/components/auth/UserProfile';
import { ArrowLeft, User, Save, Camera } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, User as FirebaseUser } from 'firebase/auth';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/init';
import { avatars, categories, getAvatarsByCategory, getAvatarById, type Avatar } from '@/components/avatars/AvatarData';

const db = getFirestore(app);

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState('cat-orange');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      setDisplayName(user.displayName || '');
      // Try to get avatar from user profile, default to cat-orange
      const avatarId = user.photoURL?.includes('avatar-') 
        ? user.photoURL.replace('avatar-', '') 
        : 'cat-orange';
      setSelectedAvatarId(avatarId);
      setLoading(false);
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setSaving(true);
      
      // Update Firebase Auth profile
      await updateProfile(user as FirebaseUser, {
        displayName: displayName || user.email?.split('@')[0] || 'User',
        photoURL: `avatar-${selectedAvatarId}` // Store avatar ID in photoURL
      });

      // Update user document in Firestore if it exists
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          displayName: displayName || user.email?.split('@')[0] || 'User',
          avatarId: selectedAvatarId,
          updatedAt: new Date()
        });
      } catch (error) {
        // User document might not exist, that's okay
        console.log('User document update skipped:', error);
      }

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      
      setIsEditingAvatar(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredAvatars = getAvatarsByCategory(selectedCategory);
  const selectedAvatar = getAvatarById(selectedAvatarId);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto flex justify-end mb-4">
          <UserProfile />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your profile...</p>
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
            <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
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

      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Customize your profile and choose your favorite avatar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar Display */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {selectedAvatar?.svg}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                  <div className="text-center">
                    <p className="font-medium">{selectedAvatar?.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedAvatar?.category}
                    </p>
                  </div>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                  />
                </div>

                {/* Email (readonly) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* Save Button */}
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Avatar Selection */}
          {isEditingAvatar && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Avatar</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select from {avatars.length} cute animal avatars
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Category Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">Categories</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/10 capitalize"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category === 'all' ? 'All' : category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {filteredAvatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatarId(avatar.id)}
                        className={`
                          w-12 h-12 rounded-full p-1 transition-all duration-200 hover:scale-110
                          ${selectedAvatarId === avatar.id 
                            ? 'ring-2 ring-primary ring-offset-2 bg-primary/10' 
                            : 'bg-muted hover:bg-muted/80'
                          }
                        `}
                        title={avatar.name}
                      >
                        {avatar.svg}
                      </button>
                    ))}
                  </div>

                  {/* Selected Avatar Info */}
                  {selectedAvatar && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white p-1">
                          {selectedAvatar.svg}
                        </div>
                        <div>
                          <p className="font-medium">{selectedAvatar.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {selectedAvatar.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
