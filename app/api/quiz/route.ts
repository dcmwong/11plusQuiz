import { NextResponse } from 'next/server';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/init';

const db = getFirestore(app);

export async function GET() {
  try {
    const quizCollection = collection(db, 'quizzes'); // Assuming your quiz data is in a collection named 'quizzes'
    const quizSnapshot = await getDocs(quizCollection);
    const quizData = quizSnapshot.docs.map(doc => doc.data());
    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return NextResponse.json({ error: 'Failed to fetch quiz data' }, { status: 500 });
  }
}