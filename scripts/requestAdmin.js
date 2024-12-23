import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase config
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
const db = getFirestore(app);
const auth = getAuth(app);

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function processAdminRequests() {
  try {
    // Get pending requests
    const requestsRef = collection(db, 'adminRequests');
    const snapshot = await getDocs(requestsRef);
    
    for (const doc of snapshot.docs) {
      const request = doc.data();
      
      if (request.status === 'pending') {
        console.log(`Processing request from ${request.email}...`);
        
        // Create admin user
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            request.email,
            // Generate a secure temporary password
            Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
          );
          
          // Set admin role
          await updateDoc(doc(db, 'admins', userCredential.user.uid), {
            email: request.email,
            fullName: request.fullName,
            company: request.company,
            role: 'admin',
            permissions: ['read', 'write'],
            createdAt: new Date()
          });
          
          // Update request status
          await updateDoc(doc(db, 'adminRequests', doc.id), {
            status: 'approved',
            approved: true,
            approvedAt: new Date()
          });
          
          // Send approval email
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: request.email,
            subject: 'Admin Access Approved',
            html: `
              <h1>Your Admin Access Request has been Approved</h1>
              <p>Dear ${request.fullName},</p>
              <p>Your request for admin access has been approved. You can now log in to the admin panel using your email address.</p>
              <p>Please use the password reset link below to set your password:</p>
              <p><a href="${process.env.VITE_API_URL}/#/admin/reset-password">Reset Password</a></p>
              <p>Best regards,<br>The Team</p>
            `
          });
          
          console.log(`✅ Approved admin access for ${request.email}`);
        } catch (error) {
          console.error(`❌ Error processing request for ${request.email}:`, error);
          
          // Update request status
          await updateDoc(doc(db, 'adminRequests', doc.id), {
            status: 'failed',
            error: error.message
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing admin requests:', error);
  }
}

processAdminRequests();