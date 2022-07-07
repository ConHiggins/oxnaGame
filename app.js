import {movePlayer, gravity, slowPlayer, playerJump, limitSpeed} from "./playerFunctions.js";

let Game = {};
const player = document.querySelector(".player");
const ground = document.querySelector(".ground");
const wall = document.querySelector(".wall");
player.style.position = "absolute";
let hsp = 0;
let vsp = 0;
let xVel = 0;
let yVel = 0;
let jumpSp = 0;
const grav = 1;
const yNumEnd = player.style.top.length-2;
const onGround = player.style.top.substring(0,yNumEnd) <= (window.innerHeight+(64));


const gameInit = () => {
    
}


gameInit();
// const states = {

//     idle:"idle",
//     run,
//     jump,
//     fall,
// }

const boxCollision = (a,b) => {

    const ax = a.getBoundingClientRect().left;
    const bx = b.getBoundingClientRect().left;
    const ay = a.getBoundingClientRect().top;
    const by = b.getBoundingClientRect().top;

    // console.log("ax"+ax);
    // console.log("ar"+ (ax + a.offsetWidth));
    // console.log("bx"+bx);
    // console.log("br"+ (bx + b.offsetWidth));
    

    if((ax + a.offsetWidth >= bx &&
        ax <= bx+b.offsetWidth) &&
        (ay + a.offsetHeight >= by &&
        ay <= by+b.offsetHeight))  {
            console.log("collide!");
            return true;
        }
    else { console.log("no");}

}

document.addEventListener("keydown", (event) => {


    switch(true) {

        case event.code == "KeyD":
            movePlayer(4,0);
            break;
        case (event.code == "KeyA"):
            movePlayer(-4,0);
            break;
        case (event.code == "Space" && jumpSp > -25):
            jumpSp-=2;
    }


})

document.addEventListener("keyup", (event) => {

    switch(true){
        case ((event.code == "Space") && (onGround==true)):
            playerJump(jumpSp);
            jumpSp = -8;
            break;
    }
})


movePlayer(hsp,vsp);


/////Create game loop

const tick = () => {

    window.requestAnimationFrame(tick);
    gravity();
    slowPlayer();
    boxCollision(player,wall);
    // console.log("on ground:" + onGround);
    // console.log("jumpSp" + jumpSp);
    // console.log("yVel:" + yVel);
}

tick();
