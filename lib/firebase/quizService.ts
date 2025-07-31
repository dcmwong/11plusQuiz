import { collection, addDoc, updateDoc, doc, getDoc, getFirestore, serverTimestamp, Timestamp, query, where, orderBy, getDocs } from 'firebase/firestore';
import { app } from './init';

const db = getFirestore(app);

// Types for our quiz session and results
export interface QuizAnswer {
  questionIndex: number;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  answeredAt: Timestamp;
}

export interface QuizSession {
  id?: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  startedAt: Timestamp;
  completedAt?: Timestamp;
  answers: QuizAnswer[];
  score?: number;
  totalQuestions: number;
  feedback?: string;
  isCompleted: boolean;
}

export interface QuizResult {
  sessionId: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Timestamp;
  timeTaken: number; // in seconds
  answers: QuizAnswer[];
  feedback?: string;
}

// Create a new quiz session when user starts a quiz
export async function createQuizSession(userId: string, quizId: string, quizTitle: string, totalQuestions: number): Promise<string> {
  try {
    const sessionData: Omit<QuizSession, 'id'> = {
      userId,
      quizId,
      quizTitle,
      startedAt: serverTimestamp() as Timestamp,
      answers: [],
      totalQuestions,
      isCompleted: false
    };

    const docRef = await addDoc(collection(db, 'quizSessions'), sessionData);
    console.log(`✅ Quiz session created with ID: ${docRef.id} for user: ${userId}`);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating quiz session:', error);
    throw error;
  }
}

// Save an individual answer
export async function saveQuizAnswer(
  sessionId: string,
  questionIndex: number,
  question: string,
  selectedAnswer: string,
  correctAnswer: string
): Promise<void> {
  try {
    const sessionRef = doc(db, 'quizSessions', sessionId);

    const answerData: QuizAnswer = {
      questionIndex,
      question,
      selectedAnswer,
      correctAnswer,
      isCorrect: selectedAnswer === correctAnswer,
      answeredAt: Timestamp.fromDate(new Date())
    };

    // Get current session data first
    const sessionDoc = await getDoc(sessionRef);
    const sessionData = sessionDoc.data() as QuizSession;
    
    // Update the answers array
    const updatedAnswers = [...(sessionData?.answers || [])];
    updatedAnswers[questionIndex] = answerData;
    
    // Update the session with the new answer
    await updateDoc(sessionRef, {
      answers: updatedAnswers,
      lastAnsweredAt: serverTimestamp()
    });

    console.log(`✅ Answer saved for question ${questionIndex + 1}`);
  } catch (error) {
    console.error('❌ Error saving answer:', error);
    throw error;
  }
}

// Complete the quiz and save final results
export async function completeQuizSession(
  sessionId: string,
  quizId: string,
  quizTitle: string,
  answers: Record<number, string>,
  questions: any[],
  score: number,
  feedback?: string
): Promise<string> {
  try {
    const sessionRef = doc(db, 'quizSessions', sessionId);

    // First, get the session to retrieve the start time
    const sessionDoc = await getDoc(sessionRef);
    const sessionData = sessionDoc.data() as QuizSession;
    
    // Convert answers to our format
    const formattedAnswers: QuizAnswer[] = questions.map((question, index) => ({
      questionIndex: index,
      question: question.question,
      selectedAnswer: answers[index] || 'Not answered',
      correctAnswer: question.correctAnswer,
      isCorrect: answers[index] === question.correctAnswer,
      answeredAt: Timestamp.fromDate(new Date())
    }));

    const completionTime = new Date();
    
    // Calculate time taken in seconds
    let timeTaken = 0;
    if (sessionData?.startedAt) {
      const startTime = sessionData.startedAt.toDate();
      timeTaken = Math.round((completionTime.getTime() - startTime.getTime()) / 1000);
    }

    // Update the session as completed
    await updateDoc(sessionRef, {
      answers: formattedAnswers,
      score,
      completedAt: serverTimestamp(),
      feedback,
      isCompleted: true
    });

    // Create a separate results record for easier querying
    const resultData: Omit<QuizResult, 'sessionId'> = {
      userId: sessionData.userId, // Include userId from session data
      quizId,
      quizTitle,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      completedAt: serverTimestamp() as Timestamp,
      timeTaken,
      answers: formattedAnswers,
      feedback
    };

    const resultRef = await addDoc(collection(db, 'quizResults'), {
      ...resultData,
      sessionId
    });

    console.log(`✅ Quiz completed in ${timeTaken}s and results saved with ID: ${resultRef.id} for user: ${sessionData.userId}`);
    return resultRef.id;
  } catch (error) {
    console.error('❌ Error completing quiz session:', error);
    throw error;
  }
}

// Get all quiz results for a specific user
export async function getUserQuizResults(userId: string): Promise<QuizResult[]> {
  try {
    console.log('🔍 Fetching quiz results for user:', userId);
    
    // Try with just where clause first, then sort in memory if needed
    const resultsQuery = query(
      collection(db, 'quizResults'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(resultsQuery);
    console.log('📊 Found', snapshot.docs.length, 'results');
    
    const results = snapshot.docs.map(doc => ({ 
      ...doc.data(), 
      sessionId: doc.id // Use doc.id as sessionId if not present in data
    } as QuizResult));
    
    // Sort by completedAt in memory (descending - newest first)
    results.sort((a, b) => {
      const aTime = a.completedAt?.toDate?.()?.getTime() || 0;
      const bTime = b.completedAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime;
    });
    
    return results;
  } catch (error) {
    console.error('❌ Error fetching user quiz results:', error);
    throw error;
  }
}

// Get all quiz sessions for a specific user
export async function getUserQuizSessions(userId: string, includeIncomplete: boolean = false): Promise<QuizSession[]> {
  try {
    console.log('🔍 Fetching quiz sessions for user:', userId, 'includeIncomplete:', includeIncomplete);
    
    // Start with basic query
    let sessionQuery = query(
      collection(db, 'quizSessions'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(sessionQuery);
    console.log('📊 Found', snapshot.docs.length, 'sessions');
    
    let sessions = snapshot.docs.map(doc => ({ 
      ...doc.data(), 
      id: doc.id 
    } as QuizSession));
    
    // Filter completed sessions in memory if needed
    if (!includeIncomplete) {
      sessions = sessions.filter(session => session.isCompleted === true);
    }
    
    // Sort by startedAt in memory (descending - newest first)
    sessions.sort((a, b) => {
      const aTime = a.startedAt?.toDate?.()?.getTime() || 0;
      const bTime = b.startedAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime;
    });
    
    return sessions;
  } catch (error) {
    console.error('❌ Error fetching user quiz sessions:', error);
    throw error;
  }
}

// Get user's quiz statistics
export async function getUserQuizStats(userId: string): Promise<{
  totalQuizzes: number;
  averageScore: number;
  totalTimePlayed: number;
  bestScore: QuizResult | null;
}> {
  try {
    const results = await getUserQuizResults(userId);
    
    if (results.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimePlayed: 0,
        bestScore: null
      };
    }
    
    const totalScore = results.reduce((sum, result) => sum + result.percentage, 0);
    const totalTime = results.reduce((sum, result) => sum + result.timeTaken, 0);
    const bestScore = results.reduce((best, current) => 
      current.percentage > (best?.percentage || 0) ? current : best
    );
    
    return {
      totalQuizzes: results.length,
      averageScore: Math.round(totalScore / results.length),
      totalTimePlayed: totalTime,
      bestScore
    };
  } catch (error) {
    console.error('❌ Error fetching user quiz stats:', error);
    throw error;
  }
}
