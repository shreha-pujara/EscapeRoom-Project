let level = 1;
let score = 0;
let time;
let timer;
let hintsLeft = 3;

let questions = [
"Decode: Uifsf jt b tfdsfu",
"What disappears when you say it?",
"Unscramble TRIANGEL",
"Keys but no locks?",
"Double me +10 = 30?"
];

let answers = [
"there is a secret",
"silence",
"triangle",
"piano",
"10"
];

let hintsData = [
"Shift each letter back by 1",
"Think silence",
"Rearrange letters",
"Musical instrument",
"Simple math"
];

document.getElementById("player").innerText =
"Player: " + (localStorage.getItem("player") || "Guest");

loadLevel();

function loadLevel(){
  document.getElementById("question").innerText = questions[level-1];
  document.getElementById("level").innerText = "Level: " + level;
  document.getElementById("score").innerText = "Score: " + score;

  startTimer();
}
function startTimer(){
  clearInterval(timer);
  time = 60;

  document.getElementById("timer").innerText = time;

  timer = setInterval(()=>{
    time--;
    document.getElementById("timer").innerText = time;

    if(time <= 0){
      clearInterval(timer);
      endGame("⏳ Time Up!");
    }
  },1000);
}
function decode(text){
  let result = "";
  for(let ch of text){
    if(ch >= 'a' && ch <= 'z'){
      result += String.fromCharCode(ch.charCodeAt(0)-1);
    } else {
      result += ch;
    }
  }
  return result;
}
function checkAnswer(){
  let ans = document.getElementById("answer").value.toLowerCase().trim();
  let decoded = decode(ans);

  if(ans === answers[level-1] || decoded === answers[level-1]){
    score += 50;
    level++;

    if(level > questions.length){
      endGame("🎉 You Escaped!");
      return;
    }

    document.getElementById("answer").value = "";
    loadLevel();

  } else {
    alert("❌ Wrong Answer");
  }
}
function useHint(){
  if(hintsLeft > 0){
    alert("💡 Hint: " + hintsData[level-1]);
    hintsLeft--;

    document.getElementById("hintCount").innerText =
      "Hints Left: " + hintsLeft;

  } else {
    alert("❌ No hints left!");
  }
}
function endGame(msg){
  localStorage.setItem("score", score);
  localStorage.setItem("result", msg);

  window.location.href = "result.html";
}
