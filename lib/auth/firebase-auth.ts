import { getAuth } from 'firebase/auth';
import { app } from '../firebase/init';

// Initialize Firebase Authentication
export const auth = getAuth(app);
