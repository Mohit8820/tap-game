var highest = 0;
var high = document.getElementById("high");
if (localStorage) {
  if (localStorage.tapHi) highest = localStorage.tapHi;
  else {
    localStorage.setItem("tapHi", 0);
  }
} else {
  // No support. Use a fallback such as browser cookies or store on the server.
}
high.innerText = highest;
//matrix method 0 1 0 0(horizontally divided in 4 planes) or randomized
function randno(n) {
  return Math.floor(Math.random() * n);
}
//add destructive tile
var speeds = ["fast", "medium", "slow", "decay"];
var positions = ["a", "b", "c", "d"];
var t = 30;
var points = 0;
var elNo = 0;
var body = document.getElementById("body");
function createEl() {
  var spd = speeds[randno(4)];
  var pos = positions[randno(4)];
  var new_el = document.createElement("button");
  new_el.classList.add("element");
  new_el.classList.add(spd);
  new_el.classList.add(`${elNo}`);
  new_el.classList.add(pos);

  document.getElementById("body").appendChild(new_el);
  document
    .getElementsByClassName(`${elNo}`)[0]
    .addEventListener("click", function () {
      if (this.classList.contains("slow")) points = points + 100;
      else if (this.classList.contains("medium")) points = points + 200;
      else if (this.classList.contains("decay")) points = points - 150;
      else points = points + 300;
      document.getElementById("points").innerHTML = points;
      this.style.display = "none";
    });
  elNo++;
}
var myInterval;
function begin() {
  myInterval = setInterval(myTimer, 1000);
}
var time = t;
function myTimer() {
  document.getElementById("timer").innerHTML = time + "s";
  createEl();
  if (time === 0) myStop();
  time--;
}
function myStop() {
  clearInterval(myInterval);
  var elements = document.getElementsByClassName("element");
  var i = 0;
  for (i = 0; i < elements.length; i++) {
    console.log(i);
    elements[i].style.display = "none";
  }
  if (points > highest) {
    highest = points;
    if (localStorage) {
      localStorage.setItem("tapHi", points);
    }
  }
  high.innerText = highest;
  document.getElementById("intro").style.display = "block";
}

var c = 3;
var start;
function restart() {
  c = 3;
  time = t;
  points = 0;
  document.getElementById("intro").style.display = "none";
  document.getElementById("points").innerHTML = "000";
  document.getElementById("timer").innerHTML = time + "s";
  clearInterval(myInterval);
  clearInterval(start);
  start = setInterval(countdown, 1000);
}

function countdown() {
  document.getElementById("countdown").style.display = "block";
  if (c === 0) stopCoundown();
  document.getElementById("countdown").innerHTML = c;
  c--;
}
function stopCoundown() {
  document.getElementById("countdown").style.display = "none";
  clearInterval(start);
  begin();
}
