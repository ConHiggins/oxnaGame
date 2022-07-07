let Game = {};
const player = document.querySelector(".player");
player.style.position = "absolute";
let hsp = 0;
let vsp = 0;
let xVel = 0;
let yVel = 0;
const grav = 1;





const movePlayer = (xAccel, yAccel) => {
    
    xVel += xAccel;
    yVel += yAccel;
    hsp+=xVel;
    vsp+=(yVel)
    limitSpeed();
    player.style.left = (hsp + "px");
    player.style.top = (vsp + "px");
    console.log("xVel:" + xVel);
    console.log("vsp:" + vsp);
    
    return;
};

const gravity = () => {

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


const limitSpeed = () => {

    const xMaxSpd = 32;
    const yMaxSpd = 32+grav;

    if(xVel >= xMaxSpd) {xVel = xMaxSpd;}

     else if(xVel <= -xMaxSpd) {xVel = -xMaxSpd;}

    if(yVel >= yMaxSpd) {yVel = yMaxSpd;}

    else if(yVel <= -yMaxSpd) {yVel = -yMaxSpd;}
}

const slowPlayer = () => {

    if(xVel > 0) {

        xVel --;
    }
    else if(xVel > 0) {

        xVel ++;
    }
}

document.addEventListener("keydown", (event) => {


    console.log(event.code )
    if(event.code == "KeyD") {
       
        movePlayer(4,0);
    }
    if(event.code == "KeyS") {

        movePlayer(0,1+yVel);
    }
})


movePlayer(hsp,vsp);


/////Create game loop

const tick = () => {

    window.requestAnimationFrame(tick);
    gravity();
    slowPlayer();
}

tick();
