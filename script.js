let level = 1;
let score = 0;
let timer;
let time;

let levelTime = [
  30,30,30,30,30,
  40,40,40,40,40,
  50,50,50,50,50,
  60,60,60,60,60
];

let questions = [
"Level 1: What disappears when you say its name?",
"Level 2: What number divided infinitely becomes 0?",
"Level 3: Unscramble → TRIANGEL",
"Level 4: Keys but no locks, produces music?",
"Level 5: Double me +10 =30?",

"Level 6: 1,3,6,10,15,?",
"Level 7: Ring but no finger?",
"Level 8: Reverse → drawer",
"Level 9: Gets sharper with use?",
"Level 10: √144?",

"Level 11: 2,4,12,48,?",
"Level 12: 5x=45",
"Level 13: Fills room but no space?",
"Level 14: Always running but never moves?",
"Level 15: 15% of 300?",

"Level 16: 3,9,27,81,?",
"Level 17: Speak without mouth?",
"Level 18: Branches but no tree?",
"Level 19: Combine level3 + level10",
"Level 20: (20÷2)×(5+5)-10"
];


let answers = [
"silence","0","triangle","piano","10",
"21","phone","reward","knife","12",
"240","9","light","clock","45",
"243","echo","bank","triangle12","90"
];

document.getElementById("player").innerText =
"Player: " + (localStorage.getItem("player") || "Guest");

loadLevel();

function loadLevel(){
  document.getElementById("question").innerText = questions[level-1];
  document.getElementById("level").innerText = "Level: "+level;
  document.getElementById("score").innerText = "Score: "+score;
  startTimer();
}

function startTimer(){
  clearInterval(timer);
  time = levelTime[level-1];
  document.getElementById("timer").innerText = time;

  timer = setInterval(()=>{
    time--;
    document.getElementById("timer").innerText = time;

    if(time<=0){
      clearInterval(timer);
      failEffect("⏳ Time Up!");
    }
  },1000);
}

// Check
function checkAnswer(){
  let ans = document.getElementById("answer").value.toLowerCase().trim();

  if(ans === answers[level-1]){
    clearInterval(timer);
    score += 100;
    successEffect();
  } else {
    clearInterval(timer);
    failEffect("❌ Wrong");
  }
}

function successEffect(){
  document.getElementById("correctSound").play();
  showConfetti();

  setTimeout(()=>{
    showPopup("🎉 Correct!");
  },3000);
}

function failEffect(msg){
  document.getElementById("wrongSound").play();
  let sad = document.getElementById("sadFace");
  sad.style.display="block";

  setTimeout(()=>{
    sad.style.display="none";
    showPopup(msg);
  },3000);
}

function showConfetti(){
  let c=document.getElementById("confetti");
  let ctx=c.getContext("2d");
  c.width=window.innerWidth;
  c.height=window.innerHeight;

  let arr=[];
  for(let i=0;i<100;i++){
    arr.push({x:Math.random()*c.width,y:Math.random()*c.height});
  }

  let anim=setInterval(()=>{
    ctx.clearRect(0,0,c.width,c.height);
    arr.forEach(p=>{
      p.y+=3;
      ctx.fillStyle="cyan";
      ctx.fillRect(p.x,p.y,5,5);
    });
  },20);

  setTimeout(()=>{
    clearInterval(anim);
    ctx.clearRect(0,0,c.width,c.height);
  },3000);
}

function showPopup(msg){
  document.getElementById("popup").style.display="block";
  document.getElementById("popupText").innerText=msg;
}

function nextLevel(){
  level++;
  if(level>questions.length){
    window.location.href="result.html";
    return;
  }
  reset();
}
function replayLevel(){
  reset();
}
function reset(){
  document.getElementById("popup").style.display="none";
  document.getElementById("answer").value="";
  loadLevel();
}

function goHome(){
  window.location.href="index.html";
}
