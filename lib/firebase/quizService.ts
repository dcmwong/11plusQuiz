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

// New interface for tracking user progress per quiz
export interface UserQuizProgress {
  id?: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  answeredQuestionIndices: number[]; // Array of question indices that have been answered
  lastUpdated: Timestamp;
}

// Interface for question selection
export interface QuestionSelection {
  selectedQuestions: any[];
  selectedIndices: number[];
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

// Get user's progress for a specific quiz
export async function getUserQuizProgress(userId: string, quizId: string): Promise<UserQuizProgress | null> {
  try {
    console.log('🔍 Fetching quiz progress for user:', userId, 'quiz:', quizId);
    
    const progressQuery = query(
      collection(db, 'userQuizProgress'),
      where('userId', '==', userId),
      where('quizId', '==', quizId)
    );
    
    const snapshot = await getDocs(progressQuery);
    
    if (snapshot.empty) {
      console.log('📊 No progress found for this quiz');
      return null;
    }
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as UserQuizProgress;
  } catch (error) {
    console.error('❌ Error fetching user quiz progress:', error);
    throw error;
  }
}

// Update user's progress for a specific quiz
export async function updateUserQuizProgress(
  userId: string,
  quizId: string,
  quizTitle: string,
  answeredQuestionIndices: number[]
): Promise<void> {
  try {
    console.log('💾 Updating quiz progress for user:', userId, 'answered questions:', answeredQuestionIndices);
    
    // First, try to find existing progress
    const existingProgress = await getUserQuizProgress(userId, quizId);
    
    if (existingProgress?.id) {
      // Update existing progress
      const progressRef = doc(db, 'userQuizProgress', existingProgress.id);
      await updateDoc(progressRef, {
        answeredQuestionIndices,
        lastUpdated: serverTimestamp()
      });
      console.log('✅ Updated existing quiz progress');
    } else {
      // Create new progress record
      const progressData: Omit<UserQuizProgress, 'id'> = {
        userId,
        quizId,
        quizTitle,
        answeredQuestionIndices,
        lastUpdated: serverTimestamp() as Timestamp
      };
      
      await addDoc(collection(db, 'userQuizProgress'), progressData);
      console.log('✅ Created new quiz progress record');
    }
  } catch (error) {
    console.error('❌ Error updating user quiz progress:', error);
    throw error;
  }
}

// Select questions for quiz, excluding already answered ones
export async function selectQuestions(
  userId: string,
  quizId: string,
  allQuestions: any[],
  maxQuestions: number = 10
): Promise<QuestionSelection> {
  try {
    console.log('🎯 Selecting questions for user:', userId, 'from', allQuestions.length, 'total questions');
    
    // Get user's progress to see which questions they've already answered
    const progress = await getUserQuizProgress(userId, quizId);
    const answeredIndices = progress?.answeredQuestionIndices || [];
    
    console.log('📝 User has already answered questions at indices:', answeredIndices);
    
    // Get indices of unanswered questions
    const unansweredIndices = allQuestions
      .map((_, index) => index)
      .filter(index => !answeredIndices.includes(index));
    
    console.log('❓ Available unanswered questions:', unansweredIndices.length);
    
    // If we don't have enough unanswered questions, reset progress and use all questions
    let selectedIndices: number[];
    if (unansweredIndices.length < maxQuestions) {
      console.log('🔄 Not enough unanswered questions, resetting progress and using all questions');
      // Reset the user's progress for this quiz
      await updateUserQuizProgress(userId, quizId, '', []);
      
      // Shuffle all question indices and take the first maxQuestions
      const allIndices = allQuestions.map((_, index) => index);
      selectedIndices = shuffleArray(allIndices).slice(0, maxQuestions);
    } else {
      // Randomly select from unanswered questions
      selectedIndices = shuffleArray(unansweredIndices).slice(0, maxQuestions);
    }
    
    // Get the actual questions using selected indices
    const selectedQuestions = selectedIndices.map(index => ({
      ...allQuestions[index],
      originalIndex: index // Keep track of original index for progress tracking
    }));
    
    console.log('✅ Selected', selectedQuestions.length, 'questions at indices:', selectedIndices);
    
    return {
      selectedQuestions,
      selectedIndices
    };
  } catch (error) {
    console.error('❌ Error selecting questions:', error);
    throw error;
  }
}

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Mark questions as answered after quiz completion
export async function markQuestionsAsAnswered(
  userId: string,
  quizId: string,
  quizTitle: string,
  questionIndices: number[]
): Promise<void> {
  try {
    console.log('✅ Marking questions as answered:', questionIndices);
    
    // Get existing progress
    const progress = await getUserQuizProgress(userId, quizId);
    const existingAnswered = progress?.answeredQuestionIndices || [];
    
    // Combine existing and new answered questions, removing duplicates
    const allAnsweredIndices = [...new Set([...existingAnswered, ...questionIndices])];
    
    // Update progress
    await updateUserQuizProgress(userId, quizId, quizTitle, allAnsweredIndices);
    
    console.log('✅ Updated answered questions. Total answered:', allAnsweredIndices.length);
  } catch (error) {
    console.error('❌ Error marking questions as answered:', error);
    throw error;
  }
}
