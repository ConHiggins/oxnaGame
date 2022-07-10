import {movePlayer, gravity, slowPlayer, playerJump, limitSpeed, underwater, aboveWater} from "./playerFunctions.js";
import {collisionCorrection, boxCollision} from "./collisions.js";

//import {player, body, ground, grav, wall, xVel, yVel, hsp, vsp, jumpSp} from "./initVars.js"

export let Game = {};
let paused = false;
let score = 0;

const HUD = document.querySelector(".HUD");
export const player = document.querySelector(".player");
export const ground = document.querySelector(".ground");
export const wall = document.querySelectorAll(".wall");
export const body = document.querySelector("body");
const wave = document.querySelector("#wave-1");
const ocean = document.querySelector(".ocean");
const box =  document.querySelector(".box");
const stars = Array.from(document.getElementsByClassName("star"));
console.log(stars);

player.style.position = "absolute";
export let hsp = 0;
export let vsp = 0;
export let xVel = 0;
export let yVel = 0;
export let jumpSp = 0;
export let grav = 1;

const gameInit = () => {

    player.style.left = window.innerWidth*0.5+"px";
    player.style.top = 0+"px";
    score = 0;
    
}

gameInit();

const showHUD = () => {

HUD.innerText = `Score: ${score}`


}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }


const dropStars = (arr) => {

    for(let i=0; i<arr.length; i++) {


        if (boxCollision(player,arr[i])) {

            score += 1;
        }
        if(arr[i].style.top.substring(0,arr[i].style.top.length-2) > body.offsetHeight
        || boxCollision(player,arr[i])){

            arr[i].style.top = getRandomInt(20) + "px";
            arr[i].style.left = getRandomInt(body.offsetWidth) + "px";
           
            
        }   

       

        arr[i].style.webkitTransform = "rotate("+(arr[i].style.top.substring(0,arr[i].style.top.length-2)*0.2)+"deg)"
        arr[i].style.top = (Number((arr[i].style.top.substring(0,arr[i].style.top.length-2))) + 2) + "px";

    };


}

////x-axis cosine movement function

const floatItemX = (item,target,speed) => {

    let orbitRadius = body.offsetWidth;
    let date,rot;

    date = Date.now() * speed; ////Delta 
    rot = target + Math.sin(date) * orbitRadius*0.5
    item.style.webkitTransform = "rotate("+rot+"deg)";
    return (target + Math.cos(date) * orbitRadius) + "px";
    
        

}

////y-axis cosine movement function

const floatItemY = (item,target,speed) => {

    let orbitRadius = 50;
    let date;

    date = Date.now() * speed; ////Delta 
      
    return (target + Math.sin(date) * orbitRadius) + "px";
    
        

}


/////////Controls/////////////////////////////////////////////////////////////////////

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
        case (event.code == "Space" && jumpSp > -10):
            event.preventDefault();
            
            jumpSp-=2;
            console.log(jumpSp);
            break;
        case (event.code == "KeyP" && paused == false):
            paused = true;
            console.log(paused);
            break;
        case (event.code == "KeyP" && paused == true):
            paused = false;
            tick();
            break;

    }


})

document.addEventListener("keyup", (event) => {

    switch(true){
        case ((event.code == "Space")):
            event.preventDefault();
            if(jumpSp < -25) { jumpSp = -25; }
            playerJump(jumpSp);
            jumpSp = -8;
            break;
    }
})


//movePlayer(hsp,vsp);


/////Create game loop

console.log("body width" + body.style.width);

const tick = () => {

    if(paused == false)
    { window.requestAnimationFrame(tick); }
    
    gravity();
    slowPlayer();
    if(boxCollision(player,ocean) || boxCollision(player,wave) )  { underwater(); }
    else { aboveWater(); }

    box.style.left = floatItemX(box, body.offsetWidth*0.5, 0.0002);
    box.style.top = floatItemY(box, body.offsetHeight*0.475, 0.002);
    
    dropStars(stars);
    showHUD();
    
}

tick();
