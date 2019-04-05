
var log = [];
var points = [];
//console.log(log[0][0]);
console.log(points);


var grid = clickableGrid(12, 12, function(el, row, col, i, isDoubleClick) {
  if (!isDoubleClick && !el.className) {
    el.className = "clicked1";
    log.push(i);
  }
  if (checkLine(log)){
    changeClassName();
  }

  if (isDoubleClick && !el.className) {
    el.className = "niclicked";
    log.push([i, 1]);
  }
  console.log(log);
});

function changeClassName(){
  var name = document.getElementsByClassName("clicked1");
  for(var i = (name.length - 1); i >= 0; i--) {
    name[i].classList.remove("clicked1");
  }
}

function clickableGrid(rows, cols, callback) {
  var i = 0;
  var grid = document.createElement("table");
  grid.className = "grid";
  for (var r = 0; r < rows; ++r) {
    var tr = grid.appendChild(document.createElement("tr"));
    for (var c = 0; c < cols; ++c && i++) {
      var cell = tr.appendChild(document.createElement("td"));
      cell.innerHTML = " ";
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
      cell.addEventListener(
          "dblclick",
          (function(el, r, c, i) {
            return function() {
              callback(el, r, c, i, true); // flag for double click handle
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
  window.location.replace("http://localhost:63342/thethegame/src/index.html?_ijt=236touv2hq0cm26bgjvku20jc9");
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
// console.log(name);
