// import "./styles.css";

var log = [];

var grid = clickableGrid(15, 20, function(el, row, col, i, isDoubleClick) {
  if (!isDoubleClick && !el.className) {
    el.className = "clicked1";
    log.push([i, 0]);
  }
  if (isDoubleClick && !el.className) {
    el.className = "niclicked";
    log.push([i, 1]);
  }
  console.log(log);
});

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


function setName() {
  document.cookie = document.getElementById("name").value;
  window.location.replace("http://localhost:63342/projectgame/thethegame/src/index.html?_ijt=77g7jv2r9cvkjcic8oatqci6gn");
  getName()
}

function getName(){
  var decodedCookie = decodeURIComponent(document.cookie);
  return decodedCookie
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

        // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
        setTimeout(function () { countdown(mins - 1); }, 1000);

      }
    }
  }
  tick();
}
// console.log(name);
