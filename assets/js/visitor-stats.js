// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQHDYIJDvN_s3TDzNI2nXuybV5WELvCDo",
  authDomain: "molesey-global-counter.firebaseapp.com",
  projectId: "molesey-global-counter",
  storageBucket: "molesey-global-counter.firebasestorage.app",
  messagingSenderId: "508365436436",
  appId: "1:508365436436:web:f2e4f54dec2104d5445901",
  measurementId: "G-2YNN2TDME7"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===============================
// Firebase Modular SDK (v10+)
// ===============================
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ===============================
// Firebase Config
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyAHQDY1JDVN_sT3DiZNxZuybV5WELvCDo",
  authDomain: "molesey-global-counter.firebaseapp.com",
  projectId: "molesey-global-counter",
  storageBucket: "molesey-global-counter.firebasestorage.app",
  messagingSenderId: "58053646346",
  appId: "1:58053646346:web:f2e4f54dec210445d454901",
  measurementId: "G-Y2NY2TDE7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===============================
// Helper: Week Number
// ===============================
function getWeekNumber(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const diff = date - firstDay;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}

// ===============================
// Main Visitor Counter Logic
// ===============================
async function updateVisitorStats() {
  const ref = doc(db, "stats", "visitors");
  const snapshot = await getDoc(ref);

  const now = new Date();

  // If document doesn't exist → create it
  if (!snapshot.exists()) {
    await setDoc(ref, {
      today: 1,
      week: 1,
      month: 1,
      year: 1,
      total: 1,
      lastVisit: now
    });
    updateUI(1, 1, 1, 1, 1);
    return;
  }

  const data = snapshot.data();
  const last = data.lastVisit.toDate();

  const isNewDay = now.getDate() !== last.getDate();
  const isNewWeek = getWeekNumber(now) !== getWeekNumber(last);
  const isNewMonth = now.getMonth() !== last.getMonth();
  const isNewYear = now.getFullYear() !== last.getFullYear();

  const updated = {
    today: isNewDay ? 1 : data.today + 1,
    week: isNewWeek ? 1 : data.week + 1,
    month: isNewMonth ? 1 : data.month + 1,
    year: isNewYear ? 1 : data.year + 1,
    total: data.total + 1,
    lastVisit: now
  };

  await updateDoc(ref, updated);
  updateUI(updated.today, updated.week, updated.month, updated.year, updated.total);
}

// ===============================
// Update UI
// ===============================
function updateUI(today, week, month, year, total) {
  document.getElementById("today").textContent = today;
  document.getElementById("week").textContent = week;
  document.getElementById("month").textContent = month;
  document.getElementById("year").textContent = year;
  document.getElementById("total").textContent = total;
}

// ===============================
// Run on page load
// ===============================
updateVisitorStats();
