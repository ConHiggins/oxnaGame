export const HUD = document.querySelector(".HUD");
export const player = document.querySelector(".player");
export const ground = document.querySelector(".ground");

export const body = document.querySelector("body");
export const wave = document.querySelector("#wave-1");
export const ocean = document.querySelector(".ocean");
export const box = document.querySelector(".box");
export const stars = Array.from(document.getElementsByClassName("star"));

export const menu = document.querySelector(".menu");
export const startButton = document.querySelector(".menu__start-button");
player.style.position = "absolute";

export const grav = body.offsetHeight * 0.00075;

export const game = {
  xVel: 0,
  yVel: 0,
  hsp: body.offsetWidth * 0.5,
  vsp: 0,
  jumpSp: 0,
};
