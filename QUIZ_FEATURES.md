# Quiz Features - Progress Tracking & Question Selection

This document describes the new features added to the quiz application for personalized learning and progress tracking.

## 🎯 New Features

### 1. **Smart Question Selection**
- **10 Questions Per Session**: Instead of showing all questions, the quiz now selects only 10 questions per session
- **Personalized Selection**: Questions are selected based on user progress to avoid repetition
- **Automatic Fallback**: If there aren't enough unanswered questions, the system resets and provides a fresh set

### 2. **Progress Tracking**
- **Question History**: Tracks which questions each user has already answered
- **User-Specific Progress**: Each user has their own progress tracked separately
- **Automatic Updates**: Progress is updated automatically when quizzes are completed

### 3. **Enhanced User Experience**
- **Loading States**: Shows progress while selecting questions
- **Progress Information**: Displays how many questions the user has completed out of the total available
- **Smart Restart**: When users run out of unanswered questions, their progress resets automatically

## 🔧 Technical Implementation

### Database Collections

#### `userQuizProgress`
Tracks user progress for each quiz:
```typescript
interface UserQuizProgress {
  id?: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  answeredQuestionIndices: number[]; // Array of question indices answered
  lastUpdated: Timestamp;
}
```

#### `quizSessions` (Enhanced)
Existing collection now works with selected questions:
- Sessions are created with the 10 selected questions
- Maintains compatibility with existing functionality

#### `quizResults` (Enhanced)
Results now include information about which questions were answered:
- Compatible with the new question selection system
- Maintains all existing result tracking

### Key Functions

#### `selectQuestions(userId, quizId, allQuestions, maxQuestions = 10)`
- Selects up to 10 unanswered questions for the user
- If fewer than 10 unanswered questions exist, resets progress and selects from all questions
- Returns both the selected questions and their original indices

#### `markQuestionsAsAnswered(userId, quizId, quizTitle, questionIndices)`
- Called after quiz completion to update user progress
- Adds newly answered question indices to the user's history
- Prevents duplicate entries

#### `getUserQuizProgress(userId, quizId)`
- Retrieves the user's current progress for a specific quiz
- Returns null if no progress exists yet

## 🚀 How It Works

### User Flow
1. **Quiz Selection**: User selects a quiz from the available options
2. **Question Selection**: System automatically selects 10 personalized questions based on progress
3. **Loading State**: Shows "Selecting Questions" with progress information
4. **Quiz Experience**: User answers the 10 selected questions
5. **Completion**: System saves results and updates progress tracking
6. **Next Session**: When user starts the same quiz again, they get different questions

### Progress Reset Logic
- When a user has answered most questions and there aren't enough (< 10) unanswered questions left
- The system automatically resets their progress for that quiz
- Ensures users can always get a full 10-question experience
- Provides a fresh start while maintaining their historical results

### Example Scenario
1. **First Session**: User answers questions 1, 3, 7, 12, 15, 18, 22, 25, 28, 30 (10 questions selected from 50 total)
2. **Second Session**: System selects 10 different questions from the remaining 40 unanswered questions
3. **Progress Display**: Shows "You've completed 20/50 total questions"
4. **Continue**: This continues until most questions are answered
5. **Reset**: When only a few questions remain unanswered, progress resets and user gets a fresh experience

## 🎨 UI/UX Improvements

### Loading States
- **Question Selection**: Informative loading screen during question selection
- **Progress Information**: Toast notifications showing completion progress
- **Smooth Transitions**: Loading states during data operations

### User Feedback
- **Progress Notifications**: "Selected 10 new questions. You've completed X/Y total questions."
- **Completion Updates**: "Your results have been saved and progress updated."
- **Error Handling**: Graceful fallbacks when operations fail

## 🛠️ Configuration

### Customizable Settings
- **Questions Per Session**: Currently set to 10, can be adjusted in `selectQuestions()` function
- **Reset Threshold**: System resets when available questions < max questions (currently 10)
- **Quiz IDs**: Each quiz needs a unique ID for progress tracking (automatically generated from titles)

### Database Setup
- No additional setup required - collections are created automatically
- Compatible with existing Firebase Firestore setup
- Uses existing authentication system

## 📊 Benefits

### For Students
- **Focused Learning**: Only 10 questions per session prevents overwhelming
- **Progress Tracking**: See how much of each topic they've covered
- **Variety**: Don't see the same questions repeatedly
- **Adaptive Experience**: Fresh content each time they practice

### For Educators/Parents
- **Engagement**: Students more likely to complete shorter sessions
- **Progress Monitoring**: Can track student progress over time
- **Spaced Repetition**: Students revisit topics with fresh questions
- **Comprehensive Coverage**: Ensures students eventually see all content

## 🔮 Future Enhancements

### Potential Improvements
- **Difficulty Progression**: Select questions based on user performance
- **Topic Focus**: Allow users to focus on specific areas where they struggle
- **Performance Analytics**: Show detailed progress reports
- **Adaptive Question Count**: Adjust number of questions based on user preference
- **Question Weighting**: Prioritize questions user got wrong in previous attempts

This system provides a solid foundation for personalized learning while maintaining the simplicity and effectiveness of the original quiz application.
