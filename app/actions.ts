
'use server';

import { generateFeedback, type FeedbackInput, type FeedbackOutput } from '@/ai/flows/personalized-feedback';

export async function getFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
  try {
    const feedback = await generateFeedback(input);
    return feedback;
  } catch (error) {
    console.error('Error generating feedback:', error);
    // Return a generic error message or re-throw to be handled by the client
    return {
      feedback: "I'm sorry, I couldn't generate feedback at this time. Please try again later.",
    }
  }
}
