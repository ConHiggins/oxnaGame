player.style.position = "absolute";

import { player, body, wave, game } from "./initVars.js";

// import { collisionCorrection, boxCollision } from "./collisions.js";
// import { gameInit } from "./app.js";

export const underwater = () => {
  player.style.backgroundColor = "#1b3d3f";
};

export const aboveWater = () => {
  player.style.backgroundColor = "black";
};

export const rotatePlayer = (numDeg) => {
  numDeg *= 2;
  return (player.style.webkitTransform = "rotate(" + numDeg + "deg)");
};

////////////////////////////////////////////////////////////////////////////////////////

const stayOnscreen = (xAccel, yAccel) => {
  const xNumEnd = player.style.left.length - 2;
  const playerX = player.style.left.substring(0, xNumEnd);
  const yNumEnd = player.style.top.length - 2;
  const playerY = player.style.top.substring(0, yNumEnd);

  ////Limit player to on-screen
  if (
    (playerX <= player.offsetWidth * 0.5 && xAccel != 0) ||
    (playerX >= body.offsetWidth - player.offsetWidth && xAccel > 0)
  ) {
    return (game.xVel *= -1);
  }

  if (
    (playerY <= 0 && yAccel < 0) ||
    (playerY >= body.offsetHeight + player.offsetHeight * 10 && yAccel > 0)
  ) {
    return (game.yVel *= -0.1);
  }
};
////////////////////////////////////////////////////////////////////////////////////////

export const movePlayer = (xAccel, yAccel) => {
  ///Apply velocity to position
  game.xVel += xAccel;
  game.yVel += yAccel;

  stayOnscreen(game.xVel, game.yVel);
  rotatePlayer(game.xVel);

  game.hsp += Math.round(game.xVel);
  game.vsp += Math.round(game.yVel);

  limitSpeed();

  ///Final positioning
  player.style.left = game.hsp + "px";
  player.style.top = game.vsp + "px";
};
////////////////////////////////////////////////////////////////////////////////////////
export const collisionSetPlayer = (x, y) => {
  game.hsp = x;
  game.vsp = y;

  player.style.left = game.hsp + "px";
  player.style.top = game.vsp + "px";
};
////////////////////////////////////////////////////////////////////////////////////////
export const gravity = () => {
  ///Limit on-screen
  const yNumEnd = player.style.top.length - 2;
  const playerY = player.style.top.substring(0, yNumEnd);

  if (playerY <= 0) {
    game.grav = 2;
  } else if (playerY > body.offsetHeight + wave.offsetHeight * 2) {
    game.grav = -2;
  } else {
    game.grav = body.offsetHeight * 0.00075;
  }

  ////Remove px from y position
  if (player.style.top.substring(0, yNumEnd) < window.innerHeight * 0.6) {
    game.yVel += game.grav;
  } else {
    game.yVel -= 1;
  }
  game.vsp += game.yVel;
  player.style.top = game.vsp + "px";
};
////////////////////////////////////////////////////////////////////////////////////////
export const setSpeed = (vel, max) => {
  if (vel >= max) {
    return (vel = max);
  } else if (vel <= -max) {
    return (vel = -max);
  }
};
////////////////////////////////////////////////////////////////////////////////////////
export const limitSpeed = () => {
  const xMaxSpd = 1;
  const yMaxSpd = 1;

  setSpeed(game.xVel, xMaxSpd);
  setSpeed(game.yVel, yMaxSpd);
};
////////////////////////////////////////////////////////////////////////////////////////
export const slowPlayer = () => {
  if (game.xVel != 0) {
    game.xVel *= 0.99;
  }
  if (game.yVel != 0) {
    game.yVel *= 0.995;
  }

  stayOnscreen(game.xVel, game.yVel);

  game.hsp += Math.round(game.xVel);
  player.style.left = game.hsp + "px";
};
////////////////////////////////////////////////////////////////////////////////////////
export const playerJump = (yAccel) => {
  game.yVel += yAccel;
  game.vsp += game.yVel;

  player.style.left = game.hsp + "px";
  player.style.top = game.vsp + "px";
};
