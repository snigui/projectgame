var log = [];
var points = [];
var point = 0;
//console.log(log[0][0]);
//console.log(points);

setUp();

var grid = clickableGrid(12, 12, function(el, row, col, i, isDoubleClick) {
  if (!isDoubleClick && !el.className) {
    el.className = "clicked1";
    log[row][col]=1;
    winning(row,col);

  }
  console.log(log);
});


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
    var tr = grid.appendChild(document.createElement("tr"));
    for (var c = 0; c < cols; ++c) {
      var cell = tr.appendChild(document.createElement("td"));
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
  return grid;
}





















function checkLine(log){
  var counter = 0;
  var point= 0;
  if (log.length >= 5){
    for (var i = 0; i <log.length; i++){
      //console.log(log[i][0] + " first value");
      for (var j = i+1; j < log.length; j++){
        while (counter < 5) {
          counter++;
          //console.log(log[j][0] + "value second ");
          if (Math.abs(log[i]- log[j]) === 12 || Math.abs(log[i] - log[j]) === 1) {
            log.splice(i);
            log.splice(j);
            /*d = document.getElementsByClassName('clicked1');
            d.className = "empty";*/
            return true

          }
        }
      }
    }
  }
}





















checkLine(log);

function setName() {
  document.cookie = document.getElementById("name").value;
  window.location.replace("http://localhost:63342/thethegame/src/index1.html");
  getName()
}

function getName() {
  var decodedCookie = decodeURIComponent(document.cookie);
  return decodedCookie
}

function displayName() {
  var name = document.getElementById("PlayerNamesDisplay");
  name.innerHTML = getName()/* + " " + ":" + " " + points[0]*/;
}

function loadGrid() {
  document.body.appendChild(grid);
}

var timeoutHandle;
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
}

var log1 = [1,2,3,4,5];

console.log(checkLine(log1));
// console.log(name);