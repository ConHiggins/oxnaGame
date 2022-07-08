export let Game = {};
export const player = document.querySelector(".player");
export const ground = document.querySelector(".ground");
export const wall = document.querySelectorAll(".wall");
export const body = document.querySelector("body");

player.style.position = "absolute";
export let hsp = 0;
export let vsp = 0;
export let xVel = 0;
export let yVel = 0;
export let jumpSp = 0;
export const grav = 0.5;