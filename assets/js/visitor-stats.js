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

// Helper: get week number
function getWeekNumber(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const diff = date - firstDay;
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}

async function updateVisitorStats() {
  const ref = db.collection("stats").doc("visitors");
  const doc = await ref.get();

  if (!doc.exists) return;

  const data = doc.data();
  const now = new Date();
  const last = data.lastVisit.toDate();

  const isNewDay = now.getDate() !== last.getDate();
  const isNewWeek = getWeekNumber(now) !== getWeekNumber(last);
  const isNewMonth = now.getMonth() !== last.getMonth();
  const isNewYear = now.getFullYear() !== last.getFullYear();

  let today = data.today;
  let week = data.week;
  let month = data.month;
  let year = data.year;
  let total = data.total;

  // Reset counters when cycle changes
  if (isNewDay) today = 0;
  if (isNewWeek) week = 0;
  if (isNewMonth) month = 0;
  if (isNewYear) year = 0;

  // Increase counters
  today++;
  week++;
  month++;
  year++;
  total++;

  // Save back to Firestore
  await ref.set({
    today,
    week,
    month,
    year,
    total,
    lastVisit: now
  });

  // Update UI
  document.getElementById("today").innerText = today;
  document.getElementById("week").innerText = week;
  document.getElementById("month").innerText = month;
  document.getElementById("year").innerText = year;
  document.getElementById("total").innerText = total;
}

updateVisitorStats();

document.getElementById("toggle-stats").onclick = () => {
  const box = document.getElementById("stats-box");
  if (box.style.display === "none") {
    box.style.display = "block";
    toggleStats.innerText = "Hide";
  } else {
    box.style.display = "none";
    toggleStats.innerText = "Show";
  }
};
