import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
    this.serverValue = app.database.ServerValue;
  }

  // ***Firebase Auth API***

  // Signup new user
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Sign In with existing user
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Sign Out User
  doSignOut = () => this.auth.signOut();

  // Password Reset
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // Update Password for current user
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // Email Verification
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  // *** Campus API ***

  campus = (uid) => this.db.ref(`campuses/${uid}`);

  campuses = () => this.db.ref('campuses');

  campusReview = (uid, ruid) => this.db.ref(`campuses/${uid}/reviews/${ruid}`);

  campusReviews = (uid) => this.db.ref(`campuses/${uid}/reviews`);

  // *** Majors API ***

  major = (uid) => this.db.ref(`majors/${uid}`);

  majors = () => this.db.ref('majors');

  majorReview = (uid, ruid) => this.db.ref(`majors/${uid}/reviews/${ruid}`);

  majorReviews = (uid) => this.db.ref(`majors/${uid}/reviews`);

  // *** Courses API ***

  course = (uid) => this.db.ref(`courses/${uid}`);

  courses = () => this.db.ref('courses');

  courseReview = (uid, ruid) => this.db.ref(`courses/${uid}/reviews/${ruid}`);

  courseReviews = (uid) => this.db.ref(`courses/${uid}/reviews`);

}

export default Firebase;
