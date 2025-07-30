'use server';
/**
 * @fileOverview Generates personalized feedback based on quiz responses.
 *
 * - generateFeedback - A function that generates personalized feedback for a user's quiz responses.
 * - FeedbackInput - The input type for the generateFeedback function.
 * - FeedbackOutput - The return type for the generateFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeedbackInputSchema = z.object({
  quizName: z.string().describe('The name of the quiz.'),
  questions: z.array(
    z.object({
      question: z.string().describe('The text of the question.'),
      options: z.array(z.string()).describe('The possible answers to the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
      userAnswer: z.string().describe('The user selected answer to the question.'),
    })
  ).describe('A list of questions, possible answers, and the user and correct answers.'),
});

export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;

const FeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback based on the user\'s quiz responses.'),
});

export type FeedbackOutput = z.infer<typeof FeedbackOutputSchema>;

export async function generateFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
  return generateFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedbackPrompt',
  input: {schema: FeedbackInputSchema},
  output: {schema: FeedbackOutputSchema},
  prompt: `You are an AI assistant providing personalized feedback on a quiz.

  Quiz Name: {{{quizName}}}

  Based on the following quiz questions and answers, provide feedback to the user.
  Focus on areas where the user can improve and highlight their strengths.

  {{#each questions}}
  Question: {{this.question}}
  Options: {{this.options}}
  Correct Answer: {{this.correctAnswer}}
  User Answer: {{this.userAnswer}}
  {{/each}}
  `,
});

const generateFeedbackFlow = ai.defineFlow(
  {
    name: 'generateFeedbackFlow',
    inputSchema: FeedbackInputSchema,
    outputSchema: FeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
