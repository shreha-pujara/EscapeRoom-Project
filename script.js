"Welcome " + localStorage.getItem("player")
let level = 1;
let score = 0;
let time = 60;
let hints = 3;

let questions = [
  "Decode: Uifsf jt b tfdsfu",
  "Binary: 01001000 01001001",
  "Pattern: 🔺🔻🔺🔺🔻"
];

let answers = [
  "there is a secret",
  "hi",
  "10110"
];

let hintsData = [
  "Shift letters back by 1",
  "Convert binary to ASCII",
  "Triangle = 1, Down = 0"
];
let playerName = localStorage.getItem("player") || "Guest";
document.getElementById("player").innerText = "Player: " + playerName;
document.getElementById("question").innerText = questions[0];
document.getElementById("level").innerText = "Level: 1";
document.getElementById("score").innerText = "Score: 0";

let timer = setInterval(() => 
  {
  time--;
  document.getElementById("timer").innerText = time;
  if (time <= 10) {
    document.getElementById("timer").style.color = "red";
  }

  // Time up
  if (time <= 0) {
    clearInterval(timer);
    endGame("❌ Time's Up! You Failed!");
  }
}, 1000);
function checkAnswer() {
  let ans = document.getElementById("answer").value.toLowerCase().trim();

  if (ans === answers[level - 1]) {
    score += 50;
    level++;
    document.getElementById("answer").value = "";
    if (level > questions.length)
    {
      endGame("🎉 You Escaped!");
      return;
    }
    document.getElementById("question").innerText = questions[level - 1];
    document.getElementById("level").innerText = "Level: " + level;
    document.getElementById("score").innerText = "Score: " + score;

    alert("✅ Correct! Next Level");
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
