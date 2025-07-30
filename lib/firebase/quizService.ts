import { collection, addDoc, updateDoc, doc, getFirestore, serverTimestamp, Timestamp } from 'firebase/firestore';
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
export async function createQuizSession(quizId: string, quizTitle: string, totalQuestions: number): Promise<string> {
  try {
    const sessionData: Omit<QuizSession, 'id'> = {
      quizId,
      quizTitle,
      startedAt: serverTimestamp() as Timestamp,
      answers: [],
      totalQuestions,
      isCompleted: false
    };

    const docRef = await addDoc(collection(db, 'quizSessions'), sessionData);
    console.log('✅ Quiz session created with ID:', docRef.id);
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
      answeredAt: serverTimestamp() as Timestamp
    };

    // Update the session with the new answer
    await updateDoc(sessionRef, {
      [`answers.${questionIndex}`]: answerData,
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
    
    // Convert answers to our format
    const formattedAnswers: QuizAnswer[] = questions.map((question, index) => ({
      questionIndex: index,
      question: question.question,
      selectedAnswer: answers[index] || 'Not answered',
      correctAnswer: question.correctAnswer,
      isCorrect: answers[index] === question.correctAnswer,
      answeredAt: serverTimestamp() as Timestamp
    }));

    const completionTime = serverTimestamp() as Timestamp;
    
    // Update the session as completed
    await updateDoc(sessionRef, {
      answers: formattedAnswers,
      score,
      completedAt: completionTime,
      feedback,
      isCompleted: true
    });

    // Create a separate results record for easier querying
    const resultData: Omit<QuizResult, 'sessionId' | 'timeTaken'> = {
      quizId,
      quizTitle,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      completedAt: completionTime,
      answers: formattedAnswers,
      feedback
    };

    const resultRef = await addDoc(collection(db, 'quizResults'), {
      ...resultData,
      sessionId,
      timeTaken: 0 // We'll calculate this properly when we have start time
    });

    console.log('✅ Quiz completed and results saved with ID:', resultRef.id);
    return resultRef.id;
  } catch (error) {
    console.error('❌ Error completing quiz session:', error);
    throw error;
  }
}
