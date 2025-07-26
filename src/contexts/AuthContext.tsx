import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase.js';
import { toast } from '@/components/ui/use-toast';

type UserRole = 'client' | 'celebrity' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string; // Added avatar field
  createdAt: string; // Added createdAt field
  status: string; // Added status field
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Function to generate avatar using initials
const generateAvatar = (name: string, email: string) => {
  if (name) {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  }

  // Fallback using email initials if no name is available
  return `https://ui-avatars.com/api/?name=${email[0].toUpperCase()}&background=random`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;

          // Check if the user's status is 'deleted'
          if (userData.status === 'deleted') {
            signOut(auth); // Log the user out if their account is marked as deleted
            toast({
              title: 'Account deleted',
              description: 'Your account has been deleted. Please contact support if you believe this is a mistake.',
              variant: 'destructive',
            });
            setUser(null);
          } else {
            setUser(userData);
          }
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const newUser: User = {
        id: user.uid,
        name,
        email,
        role: 'client',
        avatar: generateAvatar(name, email),
        createdAt: new Date().toISOString(),
        status: 'active',
      };

      await setDoc(doc(db, 'users', newUser.id), newUser);

      // ✅ Send email verification
      await sendEmailVerification(userCredential.user);

      // ✅ Log the user out
      await signOut(auth);

      toast({
        title: 'Signup successful',
        description: 'Please check your email and verify your address before logging in.',
      });

      return true;
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;

        // Check if the user's status is 'deleted'
        if (userData.status === 'deleted') {
          signOut(auth); // Log the user out if their account is marked as deleted
          toast({
            title: 'Account deleted',
            description: 'Your account has been deleted. Please contact support if you believe this is a mistake.',
            variant: 'destructive',
          });
          setUser(null);
          return false; // Don't proceed with login
        }

        if (!userCredential.user.emailVerified) {
          await signOut(auth); // Prevent access
          toast({
            title: 'Email not verified',
            description: 'Please verify your email before logging in.',
            variant: 'destructive',
          });
          // ✅ Send email verification
          await sendEmailVerification(userCredential.user);
          return false;
        }

        setUser(userData);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${userData.name}`,
        });
        return true;
      } else {
        throw new Error('User profile not found');
      }
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    toast({ title: 'Logged out' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
