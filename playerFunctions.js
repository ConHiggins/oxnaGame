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
export const grav = body.offsetHeight*0.00075;



//import {player, body, ground, wall, xVel, yVel, hsp, vsp, jumpSp} from "./initVars.js"

import { collisionCorrection, boxCollision } from "./collisions.js";

export const underwater = () => {

    player.style.backgroundColor = "#1b3d3f";
}

export const aboveWater = () => {

    player.style.backgroundColor = "black";
}

export const rotatePlayer = (numDeg) => {

    numDeg *= 2;
    return player.style.webkitTransform = "rotate("+numDeg+"deg)";

}

export const movePlayer = (xAccel, yAccel) => {

    const xNumEnd = player.style.left.length-2;
    const playerX = player.style.left.substring(0,xNumEnd);    
    const yNumEnd = player.style.top.length-2;
    const playerY = player.style.top.substring(0,yNumEnd);  
    
////Limit player to on-screen
    if((playerX <= (player.offsetWidth*0.5) && xAccel < 0)
      || (playerX >= (body.offsetWidth-player.offsetWidth) && xAccel > 0))
    { xAccel *= -10;}

    if((playerY <= (player.offsetHeight*0.5) && yAccel < 0)
      || (playerY >= (body.offsetHeight-player.offsetHeight) && yAccel > 0))
    { yAccel *= -10;}



    // if(playerX >= (body.offsetWidth-player.offsetWidth) && xAccel > 0)
    // { xAccel = -10;}
///Apply velocity to position
    xVel += xAccel;
    yVel += yAccel;

    rotatePlayer(xVel);
    
    hsp+=Math.round(xVel); 
    vsp+=Math.round(yVel);

    limitSpeed();
    // boxCollision(player, wall[0],xVel,yVel);

///Final positioning
    player.style.left = (hsp + "px"); 
    player.style.top = (vsp + "px");    
};

export const collisionSetPlayer = (x,y) => {

    hsp = x;
    vsp = y;

    player.style.left = (hsp + "px");
    player.style.top = (vsp + "px");
}

export const gravity = () => {

    ////Remove px from y position
    const yNumEnd = player.style.top.length-2;

    if(player.style.top.substring(0,yNumEnd) < (window.innerHeight*0.6)) {
            yVel += grav;
            vsp+=yVel;
            player.style.top = vsp+"px";
    }
    else {
        
        yVel -= 1;
        vsp += yVel;
        player.style.top = vsp+"px";
    }
}


export const limitSpeed = () => {

    const xMaxSpd = 20;
    const yMaxSpd = 20+grav;

    if(xVel >= xMaxSpd) {xVel = xMaxSpd;}

     else if(xVel <= -xMaxSpd) {xVel = -xMaxSpd;}

    if(yVel >= yMaxSpd) {yVel = yMaxSpd;}

    else if(yVel <= -yMaxSpd) {yVel = -yMaxSpd;}
}

export const slowPlayer = () => {

    if(xVel != 0) {xVel *= 0.92; }

    hsp += Math.round(xVel);
    player.style.left = (hsp + "px");
}

export const playerJump = (yAccel) => {

    yVel += yAccel;
    vsp += yVel;

    player.style.left = hsp+"px";
    player.style.top = vsp+"px";
    //jumpSp = 0;

}