import { useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AuthContext } from './auth-context';

const roleToKey = (role = 'Customer') => role.toLowerCase();

const roleToLabel = (role = 'customer') => {
  const roleMap = {
    customer: 'Customer',
    partner: 'Partner',
    admin: 'Admin',
  };
  return roleMap[role] || 'Customer';
};

const getUserProfile = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (!user) {
        setFirebaseUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setFirebaseUser(user);
      const userProfile = await getUserProfile(user.uid);
      setProfile(userProfile);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ name, email, password, role }) => {
    const roleKey = roleToKey(role);
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    await updateProfile(user, { displayName: name });

    const userProfile = {
      uid: user.uid,
      name: name.trim(),
      email,
      role: roleKey,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
    setProfile(userProfile);

    return {
      uid: user.uid,
      name: userProfile.name,
      email: userProfile.email,
      role: roleToLabel(userProfile.role),
      roleKey: userProfile.role,
      isLoggedIn: true,
    };
  };

  const login = async ({ email, password }) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    let userProfile = await getUserProfile(user.uid);
    if (!userProfile) {
      userProfile = {
        uid: user.uid,
        name: user.displayName || email.split('@')[0],
        email,
        role: 'customer',
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
    }

    setProfile(userProfile);

    return {
      uid: user.uid,
      name: userProfile.name,
      email: userProfile.email,
      role: roleToLabel(userProfile.role),
      roleKey: userProfile.role,
      isLoggedIn: true,
    };
  };

  const logout = async () => {
    await signOut(auth);
  };

  const authState = useMemo(() => {
    if (!firebaseUser) return null;
    const roleKey = profile?.role || 'customer';

    return {
      uid: firebaseUser.uid,
      name: profile?.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      email: profile?.email || firebaseUser.email,
      role: roleToLabel(roleKey),
      roleKey,
      isLoggedIn: true,
    };
  }, [firebaseUser, profile]);

  const value = useMemo(
    () => ({ authState, loading, register, login, logout }),
    [authState, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

