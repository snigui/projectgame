var log = [];
var point = 0;
var username = "";
var userColor = getRandomColor();
//console.log(log[0][0]);
//console.log(points);
var socket = io.connect({transports: ['websocket']});

socket.on('connect', function (event) {
  // connected to server
});
setUp();

function getIndex(log){
  var index = [];
  for (var i = 0; i < log.length; i++){
    for (var j = 1; j < log.length; j++){
      if (log[i][j] === 1){
        index.push(log[i][j])
      }
      else if (log[0][0] === 1){
        index.push(log[0][0])
      }
    }
  }
  return index
}

function addClicked(i){
  document.getElementById(i).className = "clicked1";
}

socket.on('click', function (event) {
  // received a message from the server
  console.log(username);
  var position = getIndex(event.username);
  for (var i = 0; i < position.length; i++){
    addClicked(position[i]);
  }
  document.getElementById("PlayerNamesDisplay").value = event;
});
//basically translate this into python so emit the array of position to server, have the server tell client a dot
//has been made and display the dot if you get dotMade message
//would be similar for connect 5, instead of display dot, you'd do delete dots and display score
var grid = clickableGrid(12, 12, function(el, row, col, i, isDoubleClick) {
  if (!isDoubleClick && !el.className) {
    el.className = "clicked1";
    log[row][col]=1;
    el.style.background = userColor;
    winning(row,col);
    socket.emit("click",
        JSON.stringify({username : log}));
  }
  console.log(log);
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeClassName(){
  var name = document.getElementsByClassName("clicked1");
  for(var i = (name.length - 1); i >= 0; i--) {
    name[i].classList.remove("clicked1");
  }
}



function setUp(){
  log = [];
  for ( var i = 0; i<12 ; i++){
    log[i] = [];
    for(var z = 0 ; z < 12; z++){
      log[i].push(0);
    }
  }
  console.log(log);
}


function winning(row, col){
  if(!checkForwinningOrNot(row, col)){
  }
  else {
    var name = document.getElementsByClassName("clicked1");
    for(var i = (name.length - 1); i >= 0; i--) {
      name[i].style.background = "";
    }
    changeClassName();
    point++;
    alert("Points scored:" + " " + point);

  }
}

// function changeClassName(){
//   var name = document.getElementsByClassName("tenclicked");
//   for(var i = (name.length - 1); i >= 0; i--) {
//     name[i].classList.remove("tenclicked");
//   }
// }

function checkForwinningOrNot(row,col){
  var listOfPostion = [];
  if(get(row,col,0,1)+ get(row,col,0,-1)>3){
    //listOfPostion.push(row, col);
    //cleanMatchFive(listOfPostion);
    del(row,col,0,1);
    del(row,col,0,-1);
    return true;
  }else{
    if(get(row,col,1,0)+ get(row, col, -1,0)>3){
      //listOfPostion.push(row, col);
      //cleanMatchFive(listOfPostion);
      del(row,col,1,0);
      del(row,col,-1,0);
      return true;
    }
    else{
      return false
    }
  }
}



//function cleanMatchFive(list){
//list.pop();
//}

function get(row,col,row1,col1, /*listOfPostion*/){

  if(notex(row,col) == notex(row+row1,col+col1)){
    //listOfPostion.push(row+row1, col+col1);
    return 1 + get(row+row1, col+col1, row1,col1);
  }
  else{
    return 0
  }
}

function del(row,col,row1,col1){
  if (notex(row,col) == notex(row+row1, col+col1 )){
    log[row][col]=0;
    return del(row+row1, col+col1);
  }
  else{
    return 0
  }
}

function notex(row, col) {
  //console.log(log);
  if (log[row] == undefined || log[row][col] == undefined) {
    return -1;
  } else {
    return log[row][col];
  }
}




function clickableGrid(rows, cols, callback) {
  var i = 0;
  var grid = document.createElement("table");
  grid.className = "grid";
  for (var r = 0; r < rows; ++r) {
    var thing1 = document.createElement("tr");
    thing1.setAttribute("id", r);
    var tr = grid.appendChild(thing1);
    for (var c = 0; c < cols; ++c) {
      var thing2 = document.createElement("td");
      thing2.setAttribute("id", c);
      var cell = tr.appendChild(thing2);
      cell.addEventListener(
          "click",
          (function(el, r, c, i) {
            return function() {
              // block to see if double click
              setTimeout(() => {
                callback(el, r, c, i);
              }, 400);
            };
          })(cell, r, c, i),
          false
      );

    }
  }
  // return grid;
  var d = document.createElement('div');
  d.appendChild(grid);
  return d;
}



function setName() {
  document.cookie = document.getElementById("username").value;
  window.location.replace("index1.html");
  getName()
}

function getName() {
  let decodedCookie = decodeURIComponent(document.cookie);
  username = decodedCookie;
  return decodedCookie
}

function updatePoints(){
  addPoints(point)
}

function displayName() {
  var name = document.getElementById("PlayerNamesDisplay");
  name.innerHTML = "Username: " + getName() ;
}

function addPoints(current) {
  var name = document.getElementById("PlayerScore");
  name.innerHTML = "Score: " + current;
}

function loadGrid() {
  document.body.appendChild(grid);
}

/*var timeoutHandle;
function countdown(minutes) {
  var seconds = 60;
  var mins = minutes;
  function tick() {
    var counter = document.getElementById("timer");
    var current_minutes = mins-1;
    seconds--;
    counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
    if( seconds > 0 ) {
      timeoutHandle=setTimeout(tick, 1000);
    } else {

      if(mins > 1){
        setTimeout(function () { countdown(mins - 1); }, 1000);

      }
    }
  }
  tick();
}*/

// console.log(name);