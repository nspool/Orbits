
'use strict'

var ctx, can, canX, canY, mouseIsDown = false
var downX, downY
var img = new Image()
var dullpos = 0;

window.onload = setup;

window.addEventListener('mouseup', mouseUp, false);
window.addEventListener('touchcancel', touchUp, false);

function mouseUp() {
  mouseIsDown = false
  mouseXY()
}

function touchUp() {
  mouseIsDown = false
  showPos()
}

function mouseDown() {
  mouseIsDown = true
  mouseXY()
  downX = canX
  downY = canY
}

function touchDown() {
  mouseIsDown = true
  touchXY()
  downX = canX
  downY = canY
}

function mouseXY(e) {
  if(!e) {
    var e = event;
  }
  canX = e.pageX - can.offsetLeft;
  canY = e.pageY - can.offsetTop;
  showPos()
}

function touchXY(e) {
  if (!e) {
    var e = event;
  }
  e.preventDefault();
  canX = e.targetTouches[0].pageX - can.offsetLeft;
  canY = e.targetTouches[0].pageY - can.offsetTop;
  showPos();
}

function showPos() {
  ctx.font = "24pt Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgb(64,255,64)";
  var str = canX + ", " + canY;
  if (mouseIsDown)
    str += " down";
  if (!mouseIsDown)
    str += " up";
  ctx.clearRect(0, 0, can.width, can.height);
  if (mouseIsDown) {
    ctx.fillRect(downX, downY, canX - downX, canY - downY);
  }
  // draw text at center, max length to fit on canvas
  ctx.fillText(str, can.width / 2, can.height / 2, can.width - 10);
  // plot cursor
  ctx.drawImage(img, canX-5, canY-5, 50, 25);
  ctx.drawImage(img, dullpos, 50, 50, 25);
}

function setup() {
  var sheet = document.createElement('style')
  sheet.innerHTML = 'body {margin: 0px}'
  sheet.innerHTML += 'canvas {background-color: black}'
  document.body.appendChild(sheet)
  can = document.createElement('canvas')
  can.width = '640'
  can.height = '480'
  document.body.appendChild(can)
  if(can.getContext) {
    ctx = can.getContext('2d')
  } else {
    console.log('not supported :-(')
    return
  }
  ctx.fillStyle = 'rgb(64, 255, 64)'
  ctx.textAlign = 'center'
  ctx.clearRect(0,0,can.width, can.height,99)
  can.addEventListener("mousedown", mouseDown, false);
  can.addEventListener("mousemove", mouseXY, false);
  can.addEventListener("touchstart", touchDown, false);
  can.addEventListener("touchmove", touchXY, true);
  can.addEventListener("touchend", touchUp, false);
  img.onload = function() {
    setInterval(function(){
      ctx.drawImage(img, dullpos, 50, 50, 25);
      dullpos = (dullpos + 1)%150
      }, 500)
  }
  img.src = "square.svg"; 
}

