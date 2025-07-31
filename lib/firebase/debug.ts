import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from './init';

const db = getFirestore(app);

// Test Firestore connection and list collections
export async function testFirestoreConnection() {
  try {
    console.log('🔧 Testing Firestore connection...');
    
    // Test quizSessions collection
    console.log('📋 Checking quizSessions collection...');
    const sessionsQuery = collection(db, 'quizSessions');
    const sessionsSnapshot = await getDocs(sessionsQuery);
    console.log(`✅ Found ${sessionsSnapshot.docs.length} quiz sessions`);
    
    sessionsSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`Session ${index + 1}:`, {
        id: doc.id,
        userId: data.userId,
        quizTitle: data.quizTitle,
        isCompleted: data.isCompleted,
        startedAt: data.startedAt?.toDate?.(),
        completedAt: data.completedAt?.toDate?.(),
      });
    });
    
    // Test quizResults collection
    console.log('🏆 Checking quizResults collection...');
    const resultsQuery = collection(db, 'quizResults');
    const resultsSnapshot = await getDocs(resultsQuery);
    console.log(`✅ Found ${resultsSnapshot.docs.length} quiz results`);
    
    resultsSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`Result ${index + 1}:`, {
        id: doc.id,
        sessionId: data.sessionId,
        userId: data.userId,
        quizTitle: data.quizTitle,
        score: data.score,
        percentage: data.percentage,
        completedAt: data.completedAt?.toDate?.(),
      });
    });
    
    return {
      sessionsCount: sessionsSnapshot.docs.length,
      resultsCount: resultsSnapshot.docs.length,
      sessions: sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      results: resultsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    };
    
  } catch (error) {
    console.error('❌ Firestore connection test failed:', error);
    throw error;
  }
}

// Test specific user data
export async function testUserData(userId: string) {
  try {
    console.log('👤 Testing user data for:', userId);
    
    const { getUserQuizResults, getUserQuizStats } = await import('./quizService');
    
    const results = await getUserQuizResults(userId);
    const stats = await getUserQuizStats(userId);
    
    console.log('📊 User results:', results);
    console.log('📈 User stats:', stats);
    
    return { results, stats };
  } catch (error) {
    console.error('❌ User data test failed:', error);
    throw error;
  }
}
