export const HUD = document.querySelector(".HUD");

export const player = document.querySelector(".player");
export const ground = document.querySelector(".ground");

export const body = document.querySelector("body");
export const wave = document.querySelector("#wave-1");
export const ocean = document.querySelector(".ocean");
export const floatingItems = document.querySelector(".floating-items");

export const shark = document.querySelector(".shark");
export const stars = Array.from(document.getElementsByClassName("star"));

export const menu = document.querySelector(".menu");
export const startButton = document.querySelector(".menu__start-button");
export const highscoreDisplay = document.querySelector(".menu__highscore");
player.style.position = "absolute";

export const grav = body.offsetHeight * 0.00075;

export const game = {
  xVel: 0,
  yVel: 0,
  hsp: body.offsetWidth * 0.5,
  vsp: 0,
  jumpSp: 0,
};

export const tag = document.querySelector(".menu__tagline");
export const taglines = [
  "Almost definitely not a true story",
  "Not a licenced swimming tutorial",
  "Made in Unreal Engine 5",
  "Wet Trampoline Simulator",
  "Not a recommended substitute for cardio",
  "Coming soon: BP Oil Spill DLC",
  "Buoys in the Hood",
];
