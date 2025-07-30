const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEZxSWpTT4pdJkB087fEi5FbkzZx0WX04",
  authDomain: "quiz-whiz-mfljt.firebaseapp.com",
  projectId: "quiz-whiz-mfljt",
  storageBucket: "quiz-whiz-mfljt.firebasestorage.app",
  messagingSenderId: "776490739757",
  appId: "1:776490739757:web:5cd6a3fa621d4f060bb0a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function populateFirestore() {
  try {
    // Read the quiz data file
    const dataPath = path.join(__dirname, '..', 'data', 'quiz.json');
    const quizData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log('📚 Loading quiz data from', dataPath);
    console.log('📊 Quiz title:', quizData.title);
    console.log('❓ Number of questions:', quizData.questions.length);
    
    // Add the quiz data to Firestore
    const docRef = await addDoc(collection(db, 'quizzes'), quizData);
    
    console.log('✅ Quiz data successfully added to Firestore!');
    console.log('📄 Document ID:', docRef.id);
    console.log('🔗 You can view it in the Firebase Console at:');
    console.log(`   https://console.firebase.google.com/project/quiz-whiz-mfljt/firestore/data/quizzes/${docRef.id}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding quiz data to Firestore:', error);
    process.exit(1);
  }
}

populateFirestore();
