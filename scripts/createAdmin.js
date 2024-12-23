import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminUser() {
  console.log('\n🔄 Creating admin user...');

  const adminEmail = 'admin@example.com';
  const adminPassword = 'securepassword123';

  try {
    // Try to create new admin user
    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    const user = userCredential.user;

    // Add admin document
    await setDoc(doc(db, 'admins', user.uid), {
      email: user.email,
      role: 'admin',
      permissions: ['read', 'write', 'manage_users', 'manage_content'],
      createdAt: new Date()
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\nAdmin Credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\nYou can now log in to the admin panel at #/admin/login');

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n⚠️ Admin user already exists. Verifying credentials...');
      
      try {
        // Sign in to verify credentials
        const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'admins', userCredential.user.uid));
        
        if (!adminDoc.exists()) {
          // Create admin document if it doesn't exist
          await setDoc(doc(db, 'admins', userCredential.user.uid), {
            email: adminEmail,
            role: 'admin',
            permissions: ['read', 'write', 'manage_users', 'manage_content'],
            createdAt: new Date()
          });
        }
        
        console.log('\n✅ Admin credentials verified successfully!');
        console.log('\nAdmin Credentials:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('\nYou can now log in to the admin panel at #/admin/login');
      } catch (verifyError) {
        console.error('\n❌ Error verifying admin credentials:', verifyError.message);
      }
    } else {
      console.error('\n❌ Error creating admin user:', error.message);
    }
  }

  process.exit(0);
}

createAdminUser();