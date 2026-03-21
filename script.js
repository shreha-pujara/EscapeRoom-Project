let level = 1;
let score = 0;
let timer;
let time;
let hintsLeft = 3;

let levelTime = [
60,60,60,60,60,
60,60,60,60,60,
60,60,60,60,60,
60,60,60,60,60,
60,60,60,60,60
];

let questions = [
"Decode: Uifsf jt b tfdsfu",
"Disappear when spoken?",
"Unscramble TRIANGEL",
"Keys but no locks?",
"Double me +10=30?",

"1,3,6,10,15,?",
"Ring but no finger?",
"Reverse drawer",
"Gets sharper?",
"√144?",

"2,4,12,48,?",
"5x=45",
"Fills room no space?",
"Always running?",
"15% of 300?",

"3,9,27,81,?",
"Speak without mouth?",
"Branches no tree?",
"Combine 3+10",
"(20÷2)×(5+5)-10"
];

let answers = [
"there is a secret","silence","triangle","piano","10",
"21","phone","reward","knife","12",
"240","9","light","clock","45",
"243","echo","bank","triangle12","90"
];

let hintsData = ["Shift letters","Think silence","Spell","Music","Equation"];

document.getElementById("player").innerText =
"Player: " + (localStorage.getItem("player") || "Guest");

loadLevel();

function loadLevel(){
document.querySelector(".container").style.display="block";
document.getElementById("question").innerText = questions[level-1];
document.getElementById("level").innerText = "Level "+level;
document.getElementById("score").innerText = "Score "+score;
startTimer();
}

function startTimer(){
clearInterval(timer);
time = levelTime[level-1];
document.getElementById("timer").innerText = time;

timer=setInterval(()=>{
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
}else result+=ch;
}
return result;
}

function checkAnswer(){
let ans=document.getElementById("answer").value.toLowerCase().trim();
let decoded=decodeText(ans);
  let hintsLeft = 3;

let hintsData = [
"Shift each letter back by 1",
"Think silence",
"Rearrange letters",
"Musical instrument",
"Simple math",
"Pattern addition",
"Used for calling",
"Reverse the word",
"Sharp object",
"Square root",
"Multiply pattern",
"Divide equation",
"Opposite meaning",
"Time device",
"Percentage",
"Power of 3",
"Sound reflection",
"Money place",
"Combine answers",
"Use BODMAS"
];

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

if(ans===answers[level-1]||decoded===answers[level-1]){
clearInterval(timer);
score+=100;
successEffect();
}else{
clearInterval(timer);
failEffect("❌ Wrong");
}
}

function hideUI(){
document.querySelector(".container").style.display="none";
}

function successEffect(){
hideUI();
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
hideUI();
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
