
'use server';

import { generateFeedback, type FeedbackInput, type FeedbackOutput } from '@/ai/flows/personalized-feedback';

export async function getFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
  try {
    const feedback = await generateFeedback(input);
    return feedback;
  } catch (error) {
    console.error('Error generating feedback:', error);
    
    // Calculate basic score and provide simple feedback
    const totalQuestions = input.questions.length;
    const correctAnswers = input.questions.filter(q => q.userAnswer === q.correctAnswer).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    let performanceFeedback = '';
    if (percentage >= 90) {
      performanceFeedback = 'Excellent work! You have a strong understanding of this topic.';
    } else if (percentage >= 70) {
      performanceFeedback = 'Good job! You\'re doing well, with just a few areas to review.';
    } else if (percentage >= 50) {
      performanceFeedback = 'You\'re making progress! Focus on reviewing the questions you missed.';
    } else {
      performanceFeedback = 'Keep practicing! Review the material and try again to improve your understanding.';
    }
    
    // Generate simple feedback based on wrong answers
    const wrongAnswers = input.questions.filter(q => q.userAnswer !== q.correctAnswer);
    let reviewTopics = '';
    if (wrongAnswers.length > 0) {
      reviewTopics = `\n\nQuestions to review:\n${wrongAnswers.map((q, index) => 
        `${index + 1}. ${q.question}\n   Your answer: ${q.userAnswer}\n   Correct answer: ${q.correctAnswer}`
      ).join('\n\n')}`;
    }
    
    return {
      feedback: `Quiz Complete! You scored ${correctAnswers} out of ${totalQuestions} (${percentage}%).\n\n${performanceFeedback}${reviewTopics}\n\nNote: AI-powered personalized feedback is temporarily unavailable.`,
    };
  }
}
