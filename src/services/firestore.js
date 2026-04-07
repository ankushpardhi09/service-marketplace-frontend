import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const getUserProfileByUid = async (uid) => {
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const getActiveServices = async ({ city, categoryId, pageSize = 12, cursor = null } = {}) => {
  const constraints = [
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];

  if (city) constraints.unshift(where('city', '==', city));
  if (categoryId) constraints.unshift(where('categoryId', '==', categoryId));
  if (cursor) constraints.push(startAfter(cursor));

  const snapshot = await getDocs(query(collection(db, 'services'), ...constraints));
  const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  const nextCursor = snapshot.docs[snapshot.docs.length - 1] || null;

  return { items, nextCursor };
};

export const getBookingsByCustomer = async ({ customerId, pageSize = 20, cursor = null }) => {
  const constraints = [
    where('customerId', '==', customerId),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];

  if (cursor) constraints.push(startAfter(cursor));

  const snapshot = await getDocs(query(collection(db, 'bookings'), ...constraints));
  const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  const nextCursor = snapshot.docs[snapshot.docs.length - 1] || null;

  return { items, nextCursor };
};

export const getBookingsByPartner = async ({ partnerId, pageSize = 20, cursor = null }) => {
  const constraints = [
    where('partnerId', '==', partnerId),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];

  if (cursor) constraints.push(startAfter(cursor));

  const snapshot = await getDocs(query(collection(db, 'bookings'), ...constraints));
  const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  const nextCursor = snapshot.docs[snapshot.docs.length - 1] || null;

  return { items, nextCursor };
};
