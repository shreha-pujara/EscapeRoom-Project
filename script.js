let level = 1;
let score = 0;
let timer;
let time;
let hintsLeft = 3;

let levelTime = Array(20).fill(60);

let questions = [
"Decode: Uifsf jt b tfdsfu","Disappear when spoken?","Unscramble TRIANGEL","Keys but no locks?","Double me +10=30?",
"1,3,6,10,15,?","Ring but no finger?","Reverse drawer","Gets sharper?","√144?",
"2,4,12,48,?","5x=45","Fills room no space?","Always running?","15% of 300?",
"3,9,27,81,?","Speak without mouth?","Branches no tree?","Combine 3+10","(20÷2)×(5+5)-10"
];

let answers = [
"there is a secret","silence","triangle","piano","10",
"21","phone","reward","knife","12",
"240","9","light","clock","45",
"243","echo","bank","triangle12","90"
];

let hintsData = [
"Shift letters","Think silence","Rearrange","Music","Math",
"Pattern","Phone","Reverse","Knife","Square root",
"Multiply","Divide","Light","Clock","Percentage",
"Power of 3","Echo","Bank","Combine","BODMAS"
];

document.getElementById("player").innerText =
"Player: " + (localStorage.getItem("player") || "Guest");

loadLevel();

function loadLevel(){
  document.getElementById("question").innerText = questions[level-1];
  document.getElementById("level").innerText = "Level "+level;
  document.getElementById("score").innerText = "Score "+score;
  document.getElementById("hintCount").innerText = "Hints Left: "+hintsLeft;
  document.getElementById("answer").value="";
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
    } else result+=ch;
  }
  return result;
}

function checkAnswer(){
  let ans=document.getElementById("answer").value.toLowerCase().trim();
  let decoded=decodeText(ans);

  if(ans===answers[level-1]||decoded===answers[level-1]){
    clearInterval(timer);
    score+=100;
    successEffect();
  } else {
    clearInterval(timer);
    failEffect("❌ Wrong");
  }
}

function useHint(){
  if(hintsLeft > 0){

    let hint = hintsData[level-1];

    if(!hint){
      alert("No hint available");
      return;
    }

    alert("💡 Hint: " + hint);

    hintsLeft--;

    document.getElementById("hintCount").innerText =
      "Hints Left: " + hintsLeft;

  } else {
    alert("❌ No hints left!");
  }
}


function successEffect(){
  document.getElementById("correctSound").play();
  document.getElementById("happyFace").style.display="flex";
  document.getElementById("confetti").style.display="block";
  showConfetti();

  setTimeout(()=>{
    document.getElementById("happyFace").style.display="none";
    document.getElementById("confetti").style.display="none";
    level++;
    if(level>questions.length){
      endGame("🎉 You Escaped!");
      return;
    }
    loadLevel();
  },3000);
}

function failEffect(msg){
  document.getElementById("wrongSound").play();
  document.getElementById("sadFace").style.display="flex";

  setTimeout(()=>{
    document.getElementById("sadFace").style.display="none";
    endGame(msg);
  },3000);
}


function showConfetti(){
  let c=document.getElementById("confetti");
  let ctx=c.getContext("2d");
  c.width=window.innerWidth;
  c.height=window.innerHeight;

  let colors=["red","yellow","blue","green","pink"];
  let arr=[];

  for(let i=0;i<100;i++){
    arr.push({x:Math.random()*c.width,y:Math.random()*c.height,color:colors[Math.random()*colors.length|0]});
  }

  let anim=setInterval(()=>{
    ctx.clearRect(0,0,c.width,c.height);
    arr.forEach(p=>{
      p.y+=3;
      ctx.fillStyle=p.color;
      ctx.fillRect(p.x,p.y,5,5);
    });
  },20);

  setTimeout(()=>clearInterval(anim),3000);
}

// END GAME
function endGame(msg){
  localStorage.setItem("score",score);
  localStorage.setItem("result",msg);
  window.location.href="result.html";
}
