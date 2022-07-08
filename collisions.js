import {player, body, ground, grav, wall, xVel, yVel, hsp, vsp, jumpSp} from "./initVars.js"
import { collisionSetPlayer } from "./playerFunctions.js";

export const collisionCorrection = (a,b,xVel,yVel) => {

    const ax = a.getBoundingClientRect().left-1;
    const bx = b.getBoundingClientRect().left-1;
    const ay = a.getBoundingClientRect().top;
    const by = b.getBoundingClientRect().top;

       if(xVel > 0) { 
        console.log("right") 
        return collisionSetPlayer(bx-(a.offsetWidth+2),player.style.top); }
    else if(xVel < 0) {
        console.log("left");
        
        return collisionSetPlayer(bx+(b.offsetWidth+2),player.style.top); 
        }

    if(yVel > 0) { 
        return collisionSetPlayer(player.style.left, by-(a.offsetHeight+2))
    }
    else if(yVel < 0) { return collisionSetPlayer(player.style.left, by+(b.offsetHeight+2)); }

}

export const boxCollision = (a,b) => {

    const ax = a.getBoundingClientRect().left;
    const bx = b.getBoundingClientRect().left;
    const ay = a.getBoundingClientRect().top;
    const by = b.getBoundingClientRect().top;    

    if((ax + a.offsetWidth >= bx &&
        ax <= bx+b.offsetWidth) &&
        (ay + a.offsetHeight >= by &&
        ay <= by+b.offsetHeight))  {

            console.log("collide!");
            return true;  
        }
    else { return false}

}