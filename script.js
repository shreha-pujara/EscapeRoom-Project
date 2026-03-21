let level = 1;
let score = 0;
let time = 120;
let hints = 5;

// QUESTIONS (20 LEVELS)
let questions = [

  // 🟢 EASY (1–5)
  "Riddle: What has hands but cannot clap?",
  "Math: What is 10 + 5?",
  "Word: Unscramble → 'TAC'",
  "Color: What color is the sky on a clear day?",
  "Count: How many days are there in a week?",

  // 🟡 MEDIUM (6–10)
  "Pattern: 2, 4, 6, 8, ?",
  "Logic: What has a face and two hands but no arms or legs?",
  "Math: What is 12 × 2?",
  "Reverse: 'god'",
  "Riddle: What has a neck but no head?",

  // 🔴 HARD (11–15)
  "Pattern: 1, 3, 6, 10, ?",
  "Math Logic: If x + 3 = 9, what is x?",
  "Word: What is the opposite of 'hot'?",
  "Riddle: What gets wetter the more it dries?",
  "Number: What is half of 50?",

  // ⚫ EXTREME (16–20)
  "Logic: I am always in front of you but can’t be seen. What am I?",
  "Math: What is 15 × 3?",
  "Riddle: What has one eye but cannot see?",
  "Final Combo: Combine answer of level 1 + level 3",
  "Final Boss: What is (5 + 5) × 2?"
];

// ANSWERS
let answers = [

  // EASY
  "clock",
  "15",
  "cat",
  "blue",
  "7",

  // MEDIUM
  "10",
  "clock",
  "24",
  "dog",
  "bottle",

  // HARD
  "15",
  "6",
  "cold",
  "towel",
  "25",

  // EXTREME
  "future",
  "45",
  "needle",
  "clockcat",
  "20"
];

let hintsData = [

  // EASY
  "Look at a wall clock",
  "Basic addition",
  "It's an animal",
  "Look up ☁️",
  "Think calendar",

  // MEDIUM
  "Add 2 each time",
  "Used to tell time",
  "Multiply",
  "Reverse the word",
  "Used to hold liquid",

  // HARD
  "Add increasing numbers",
  "Solve equation",
  "Opposite meaning",
  "Used after bath",
  "Divide by 2",

  // EXTREME
  "Think about time",
  "Multiply",
  "Used for stitching",
  "Use previous answers",
  "Solve step by step"
];

let playerName = localStorage.getItem("player") || "Guest";
document.getElementById("player").innerText = "Player: " + playerName;

// INITIAL UI
document.getElementById("question").innerText = questions[0];
document.getElementById("level").innerText = "Level: 1 (Easy)";
document.getElementById("score").innerText = "Score: 0";

let timer = setInterval(() => {
  time--;
  document.getElementById("timer").innerText = time;

  if (time <= 10) {
    document.getElementById("timer").style.color = "red";
  }

  if (time <= 0) {
    clearInterval(timer);
    endGame("⏳ Time's Up!");
  }
}, 1000);

function checkAnswer() {
  let ans = document.getElementById("answer").value.toLowerCase().trim();

  if (ans === answers[level - 1]) {
    if(level <= 5) score += 20;
    else if(level <= 10) score += 40;
    else if(level <= 15) score += 60;
    else score += 80;

    level++;

    document.getElementById("answer").value = "";

    if (level > questions.length) {
      endGame("🎉 You Escaped All Levels!");
      return;
    }

    let type =
      level <= 5 ? "Easy" :
      level <= 10 ? "Medium" :
      level <= 15 ? "Hard" : "Extreme";

    document.getElementById("question").innerText = questions[level - 1];
    document.getElementById("level").innerText = "Level: " + level + " (" + type + ")";
    document.getElementById("score").innerText = "Score: " + score;

    alert("✅ Correct!");
  } else {
    alert("❌ Wrong Answer");
  }
}

function useHint() {
  if (hints > 0) {
    alert("💡 Hint: " + hintsData[level - 1]);
    hints--;
  } else {
    alert("❌ No hints left!");
  }
}

function endGame(message) {
  clearInterval(timer);

  localStorage.setItem("score", score);
  localStorage.setItem("result", message);

  let board = JSON.parse(localStorage.getItem("leaderboard")) || [];

  board.push({
    name: playerName,
    score: score
  });

  localStorage.setItem("leaderboard", JSON.stringify(board));

  window.location.href = "result.html";
}
