import {movePlayer, gravity, slowPlayer, playerJump, limitSpeed, underwater, aboveWater} from "./playerFunctions.js";
import {collisionCorrection, boxCollision} from "./collisions.js";

//import {player, body, ground, grav, wall, xVel, yVel, hsp, vsp, jumpSp} from "./initVars.js"

export let Game = {};
export const player = document.querySelector(".player");
export const ground = document.querySelector(".ground");
export const wall = document.querySelectorAll(".wall");
export const body = document.querySelector("body");
const wave = document.querySelector("#wave-1");

player.style.position = "absolute";
export let hsp = 0;
export let vsp = 0;
export let xVel = 0;
export let yVel = 0;
export let jumpSp = 0;
export const grav = 1;

const gameInit = () => {
    
}

gameInit();

document.addEventListener("keydown", (event) => {


    switch(true) {

        case (event.code == "KeyD"):
            movePlayer(2,0);
            break;
        case (event.code == "KeyA"):
            movePlayer(-2,0);
            break;
        case (event.code == "Space"):
            event.preventDefault();
        case (event.code == "Space" && jumpSp > -25):
            event.preventDefault();
            jumpSp-=2;
    }


})

document.addEventListener("keyup", (event) => {

    switch(true){
        case ((event.code == "Space")):
            event.preventDefault();
            playerJump(jumpSp);
            jumpSp = -8;
            break;
    }
})


//movePlayer(hsp,vsp);


/////Create game loop

console.log("body width" + body.style.width);

const tick = () => {

    window.requestAnimationFrame(tick);
    gravity();
    slowPlayer();
    if(boxCollision(player,wave)) { underwater(); }
    else { aboveWater(); }
    
}

tick();
