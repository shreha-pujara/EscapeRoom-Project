let level = 1;
let score = 0;
let timer;
let time;
let hintsLeft = 3;

let levelTime = [
  30,30,30,30,30,
  40,40,40,40,40,
  50,50,50,50,50,
  60,60,60,60,60
];

let questions = [
"Decode: Uifsf jt b tfdsfu",
"Level 2: What disappears when you say its name?",
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
"there is a secret","silence","triangle","piano","10",
"21","phone","reward","knife","12",
"240","9","light","clock","45",
"243","echo","bank","triangle12","90"
];

let hintsData = [
"Shift letters back by 1","Think silence","Triangle spelling","Musical instrument","Equation",
"Add pattern","Communication device","Reverse","Cutting tool","Square root",
"Multiply pattern","Divide","Opposite","Time","Percentage",
"Power of 3","Echo","Finance","Combine answers","BODMAS"
];

// PLAYER
document.getElementById("player").innerText =
"Player: " + (localStorage.getItem("player") || "Guest");

loadLevel();

function loadLevel(){
  document.getElementById("question").innerText = questions[level-1];
  document.getElementById("level").innerText = "Level: "+level;
  document.getElementById("score").innerText = "Score: "+score;
  document.getElementById("hintCount").innerText = "Hints Left: "+hintsLeft;
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
function decodeText(text){
  let result="";
  for(let ch of text){
    if(ch>='a'&&ch<='z'){
      result+=String.fromCharCode(ch.charCodeAt(0)-1);
    } else result+=ch;
  }
  return result;
}
function checkAnswer(){
  let ans=document.getElementById("answer").value.toLowerCase().trim();
  let decoded=decodeText(ans);

  if(ans===answers[level-1] || decoded===answers[level-1]){
    clearInterval(timer);
    score+=100;
    successEffect();
  } else {
    clearInterval(timer);
    failEffect("❌ Wrong");
  }
}
function successEffect(){
  document.getElementById("correctSound").play();

  let happy=document.getElementById("happyFace");
  let confetti=document.getElementById("confetti");

  happy.style.display="flex";
  confetti.style.display="block";

  showConfetti();

  setTimeout(()=>{
    happy.style.display="none";
    confetti.style.display="none";

    showPopup("🎉 Correct!");

    showButtons(true);

  },3000);
}
function failEffect(msg){
  document.getElementById("wrongSound").play();

  let sad=document.getElementById("sadFace");
  sad.style.display="flex";

  setTimeout(()=>{
    sad.style.display="none";

    showPopup(msg);

    showButtons(false);

  },3000);
}
function showButtons(success){
  let next=document.querySelector("#popup button[onclick='nextLevel()']");
  let replay=document.querySelector("#popup button[onclick='replayLevel()']");
  let home=document.querySelector("#popup button[onclick='goHome()']");

  next.style.display = success ? "inline" : "none";
  replay.style.display = "inline";
  home.style.display = "inline";
}
function showConfetti(){
  let c=document.getElementById("confetti");
  let ctx=c.getContext("2d");
  c.width=window.innerWidth;
  c.height=window.innerHeight;

  let colors=["red","yellow","blue","green","pink","orange"];
  let arr=[];

  for(let i=0;i<120;i++){
    arr.push({x:Math.random()*c.width,y:Math.random()*c.height,color:colors[Math.random()*colors.length|0]});
  }

  let anim=setInterval(()=>{
    ctx.clearRect(0,0,c.width,c.height);
    arr.forEach(p=>{
      p.y+=3;
      ctx.fillStyle=p.color;
      ctx.fillRect(p.x,p.y,6,6);
    });
  },20);

  setTimeout(()=>clearInterval(anim),3000);
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

function replayLevel(){ reset(); }

function reset(){
  document.getElementById("popup").style.display="none";
  document.getElementById("answer").value="";
  loadLevel();
}

function goHome(){
  window.location.href="index.html";
}
function useHint(){
  if(hintsLeft>0){
    alert("💡 "+hintsData[level-1]);
    hintsLeft--;
    score-=20;
    document.getElementById("hintCount").innerText="Hints Left: "+hintsLeft;
    document.getElementById("score").innerText="Score: "+score;
  } else {
    alert("❌ No hints left");
  }
}
