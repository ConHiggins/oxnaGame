import {
  movePlayer,
  gravity,
  slowPlayer,
  playerJump,
  limitSpeed,
  underwater,
  aboveWater,
} from "./playerFunctions.js";
import { collisionCorrection, boxCollision } from "./collisions.js";

import {
  HUD,
  player,
  highscoreDisplay,
  body,
  grav,
  wave,
  ocean,
  floatingItems,
  stars,
  menu,
  tag,
  taglines,
  startButton,
  game,
} from "./initVars.js";

let paused = false;
let day = true;
let reset = false;
let score = 0;
let multiplier = 1;
let KeyD = false;
let KeyA = false;
let highscores = [];

const gameCont = document.querySelector(".game-container");
const points = document.querySelector(".points");
let boxCount = 0;
///////////////////////////////////////////////////
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

///Disable default browser mobile touch controls

window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);
///////////////////////////////////////////////////
const addHazard = () => {
  boxCount += 1;
  floatingItems.innerHTML += `<div class="box" id="box_${boxCount}"></div>`;
};

const removeHazards = () => {
  boxCount = 0;
  floatingItems.innerHTML = "";
};
///////////////////////////////////////////////////
const gameInit = () => {
  paused = true;
  menu.style.opacity = 1;
  menu.style.display = "block";
  tag.innerText = taglines[getRandomInt(taglines.length - 1)];
  removeHazards();
  highscores = highscores.sort((a, b) => b - a);
  if (highscores.length > 0) {
    highscores = highscores.splice(0, 1);
    highscoreDisplay.innerText = `High score: ${highscores[0]}`;
  }
  game.xVel = 0;
  game.yVel = 0;
  game.hsp = body.offsetWidth * 0.5;
  game.vsp = 0;
  player.style.left = game.hsp + "px";
  player.style.top = "0px";
  score = 0;
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.top = 0;
  }
  reset = false;
};

gameInit();
///////////////////////////////////////////////////
const showHUD = () => {
  HUD.innerText = `Score: ${score}`;
};

///////////////////////////////////////////////////
const dropStars = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const hitBottom =
      arr[i].style.top.substring(0, arr[i].style.top.length - 2) >
      body.offsetHeight;

    if (boxCollision(player, arr[i])) {
      arr[i].style.opacity = 0;
      scoreAdd();
    }
    if (
      ////Collected or reaches bottom of screen
      hitBottom ||
      boxCollision(player, arr[i])
    ) {
      arr[i].style.top = getRandomInt(20) + "px";
      arr[i].style.left = getRandomInt(body.offsetWidth) + "px";
      arr[i].style.opacity = 1;
    }

    arr[i].style.webkitTransform =
      "rotate(" +
      arr[i].style.top.substring(0, arr[i].style.top.length - 2) * 0.9 +
      "deg)";
    arr[i].style.top =
      Number(arr[i].style.top.substring(0, arr[i].style.top.length - 2)) +
      Math.max(2, score * 0.05) +
      "px";
  }
};
///////////////////////////////////////////////////
////x-axis cos movement function

/**
 * Lerp an item on the x axis around a target coordinate, and specify whether it should rotate
//  * @param {Element} item
//  * @param {Number} target
//  * @param {Number} speed
//  * @param {Boolean} rotate
//  */
const floatItemX = (item, target, speed, rotate) => {
  let orbitRadius = body.offsetWidth;
  let date, rot;

  date = Date.now() * speed; ////Delta
  if ((rotate = true)) {
    rot = target + Math.sin(date) * orbitRadius * 0.5;
    item.style.webkitTransform = "rotate(" + rot + "deg)";
  }
  return target + Math.cos(date) * orbitRadius + "px";
};

////y-axis sin movement function

/**
 * Lerp an item on the y axis around a target coordinate
//  * @param {Element} item
//  * @param {Number} target
//  * @param {Number} speed
//  */
const floatItemY = (item, target, speed) => {
  let orbitRadius = 50;
  let date;

  date = Date.now() * speed; ////Delta

  return target + Math.sin(date) * orbitRadius + "px";
};

/////////Controls/////////////////////////////////////////////////////////////////////

body.addEventListener("touchstart", (e) => {
  const centreX = window.innerWidth * 0.5;
  const centreY = gameCont.style.height * 0.5;
  if (game.jumpSp > -10 && e.touches[0].clientY > centreY) {
    game.jumpSp -= 2;
  }
  player.style.border = game.jumpSp * -0.1 + "px solid white";
  if (e.touches[0].clientX > centreX) {
    //// Get X region of user thumb
    KeyD = true;
  } else if (e.touches[0].clientX < centreX) {
    KeyA = true;
  }
});

body.addEventListener("touchend", (e) => {
  KeyA = false;
  KeyD = false;
  if (game.jumpSp < -25) {
    game.jumpSp = -25;
  }
  playerJump(game.jumpSp);
  player.style.border = 0 + "px solid white";
  game.jumpSp = -8;
});

document.addEventListener("keydown", (event) => {
  switch (true) {
    //Reset game
    case event.code == "KeyR":
      reset = true;
      highscores.push(score);
      gameInit();
      break;
    //Move right
    case event.code == "KeyD" && paused == false:
      KeyD = true;
      break;
    //Move left
    case event.code == "KeyA" && paused == false:
      KeyA = true;
      break;
    //Jump
    case event.code == "Space":
      event.preventDefault();
    case event.code == "Space" && game.jumpSp > -10:
      event.preventDefault();
      game.jumpSp -= 2;
      player.style.border = game.jumpSp * -0.1 + "px solid white";
      break;
    //Pause
    case event.code == "KeyP" && paused == false:
      paused = true;
      console.log(paused);
      break;
    case event.code == "KeyP" && paused == true:
      paused = false;
      tick();
      break;
    //Debug add hazard
    case event.code == "KeyL":
      addHazard();
  }
});

document.addEventListener("keyup", (event) => {
  switch (true) {
    ///Enact jump and reset
    case event.code == "Space" && paused == false:
      event.preventDefault();
      if (game.jumpSp < -25) {
        game.jumpSp = -25;
      }
      playerJump(game.jumpSp);
      player.style.border = 0 + "px solid white";
      game.jumpSp = -8;
      break;
    //Set movement to false
    case event.code == "KeyD":
      KeyD = false;
      break;
    case event.code == "KeyA":
      KeyA = false;
      break;
  }
});

const scoreAdd = () => {
  multiplier = 1 + Math.floor(score * 0.1);
  score += multiplier;
  highscores = highscores.sort((a, b) => b - a);
  if (score > highscores[0]) {
    highscores.push(score);
  }
  points.style.color = "#ffe571";
  points.style.opacity = 1;
  points.style.left = game.hsp + "px";
  points.style.top = game.vsp + "px";
  points.innerText = `+${multiplier}`;
};

const scoreDeplete = () => {
  multiplier = 1 + Math.floor(score * 0.1);
  score -= multiplier * 5;
  points.style.color = "#c93510";
  points.style.opacity = 1;
  points.style.left = game.hsp + "px";
  points.style.top = game.vsp + "px";
  points.innerText = `-${multiplier * 5}`;
  if (score <= 0) {
    gameInit();
  }
};

const boxControl = () => {
  /////Hazards movement and spawn //////////////////////////////////////////////////////////
  if (boxCount < 1 && score >= 10) {
    addHazard();
  }
  if (boxCount == 1 && score >= 50) {
    addHazard();
  }
  if (boxCount == 2 && score >= 100) {
    addHazard();
  }

  if (boxCount >= 1) {
    let box_1 = document.querySelector("#box_1");
    box_1.style.left = floatItemX(box_1, body.offsetWidth * 0.5, 0.0004, true);
    box_1.style.top = floatItemY(box_1, body.offsetHeight * 0.475, 0.002);
    if (boxCollision(player, box_1)) {
      game.xVel *= -2;
      game.yVel *= -2;
      scoreDeplete();
    }
  }

  if (boxCount > 1) {
    let box_2 = document.querySelector("#box_2");
    box_2.style.left = floatItemX(box_2, body.offsetWidth * 0.5, 0.0003, true);
    box_2.style.top = floatItemY(box_2, body.offsetHeight * 0.475, 0.003);
    if (boxCollision(player, box_2)) {
      game.xVel *= -2;
      game.yVel *= -2;
      scoreDeplete();
    }
  }
  if (boxCount > 2) {
    let box_3 = document.querySelector("#box_3");
    box_3.style.left = floatItemX(box_3, body.offsetWidth * 0.5, 0.0002, true);
    box_3.style.top = floatItemY(box_3, body.offsetHeight * 0.475, 0.006);
    if (boxCollision(player, box_3)) {
      game.xVel *= -2;
      game.yVel *= -2;
      scoreDeplete();
    }
  }
};

const dayNight = () => {
  if (day == true) {
    console.log("sunset");
    gameCont.style.setProperty("--op", "1");
    day = false;
  } else if (day == false) {
    console.log("sunrise");
    gameCont.style.setProperty("--op", "0");
    day = true;
  }
};

setInterval(dayNight, 40000);

/////Create game loop
const tick = () => {
  if (paused == false) {
    window.requestAnimationFrame(tick);
  }

  if (KeyD == true) {
    movePlayer(0.5, 0);
  }
  if (KeyA == true) {
    movePlayer(-0.5, 0);
  }

  if (boxCollision(player, ocean) || boxCollision(player, wave)) {
    underwater();
  } else {
    aboveWater();
  }
  gravity();
  slowPlayer();
  dropStars(stars);
  boxControl();
  showHUD();
  points.style.opacity *= 0.95;
};

startButton.addEventListener("click", () => {
  paused = false;
  tick();
  menu.style.opacity = 0;
  menu.style.display = "none";
});
