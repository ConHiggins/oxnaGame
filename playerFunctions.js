const player = document.querySelector(".player");
let hsp = 0;
let vsp = 0;
let xVel = 0;
let yVel = 0;
let jumpSp = 0;
const grav = 1;
const yNumEnd = player.style.top.length-2;
const onGround = player.style.top.substring(0,yNumEnd) < (window.innerHeight-(128))



export const movePlayer = (xAccel, yAccel) => {
    
    xVel += xAccel;
    yVel += yAccel;

    hsp+=xVel;
    vsp+=(yVel);

    limitSpeed();


    player.style.left = (hsp + "px"); 
    player.style.top = (vsp + "px");
    
    
    return;
};

export const gravity = () => {

    ////Remove px from y position
    const yNumEnd = player.style.top.length-2;

    if(player.style.top.substring(0,yNumEnd) < (window.innerHeight-(128))) {
            yVel += grav;
            vsp+=yVel;
            player.style.top = vsp+"px";
    }
    else {
        yVel = 0;
    }
}


export const limitSpeed = () => {

    const xMaxSpd = 24;
    const yMaxSpd = 24+grav;

    if(xVel >= xMaxSpd) {xVel = xMaxSpd;}

     else if(xVel <= -xMaxSpd) {xVel = -xMaxSpd;}

    if(yVel >= yMaxSpd) {yVel = yMaxSpd;}

    else if(yVel <= -yMaxSpd) {yVel = -yMaxSpd;}
}

export const slowPlayer = () => {

    if(xVel != 0) {xVel *= 0.92; }

    hsp += xVel;
    player.style.left = (hsp + "px");
}

export const playerJump = (yAccel) => {

    movePlayer(xVel,0);

        yVel += yAccel;
        vsp += yVel;

    player.style.left = hsp+"px";
    player.style.top = vsp+"px";
    jumpSp = 0;

}