var cv      = null;
var score   = 0;

var context = null;
var player  = null;
var enime   = null;
var platform= null;
var bonus   = null;

var textscore= null;

var width  = window.innerWidth;
var height = window.innerHeight;

var posx  = 10;
var posy  = 720-64;

var posxE  = 150;
var posyE  = 500;

var posxB  = Math.floor( Math.random() * 1000);
var posyB  = Math.floor( Math.random() * 1000);

var speed    = 8 ;
var friction = 25;
var gravity  = 0.3 ;
var jumping  = false;
var vy = 0;
var vx = 0;

keys = [];


function setup() {
    cv = document.getElementById("cv");
    context  = cv.getContext('2d');

    enime    = cv.getContext('2d');
    platform = cv.getContext('2d');
    bonus    = cv.getContext('2d');
    textscore= cv.getContext('2d');

    cv.width = width;
    cv.height = 720;

    context.fillStyle = "#000";
    context.fillRect(0,0,width,720);

    player   = cv.getContext('2d');
    player.beginPath();
    player.fillStyle = "blue";
    player.fillRect(posx,posy,32,32);
    player.closePath();
    player.fill();

    platform.fillStyle = "green";
    platform.fillRect(0,720-32,width,32);

    bonus.fillStyle = "yellow";
    bonus.fillRect(posxB,posyB,32,32);

    enime.fillStyle = "red";
    enime.fillRect(posxE,posyE,32,32);

    textscore.fillStyle = "white";
    textscore.font = "30px Arial";
    textscore.fillText("Score : " +score,10,50);
}


function loup(){
    setup();
    requestAnimationFrame(loup);

    //player.clearRect(posx,posy,32,32);

    if(keys[37]){
        posx--;

    }

    if(keys[39]) {
        posx++;

    }

    //@@@@@@@@@ collisione  player @@@@@@@@@@\\

    if (posx >= width - 32){
        posx = width - 32;
    }
    if (posx < 0){
        posx = 0;
    }
    vx *= friction;

    vy += gravity;

    posx += vx;
    posy += vy;

    if (posy >  720-64){
        posy =  720-64;
        jumping = false;
    }

    if ( keys[38] || keys[32] ) {
        if(!jumping){
            jumping = true;
            vy = -(speed*2);
        }
    }

    // With Platform.

    // With Enime.
    if (posx >= posxE  &&  posx <= posxE + 32 && posy >= posyE  &&  posy <= posyE + 32){
        posx  = 10;
        posy  = 720-64;

    }
    //with bonus
    if (posx >= posxB  &&  posx <= posxB + 32 && posy >= posyB  &&  posy <= posyB + 32){
        score++;
        posxB = Math.floor( Math.random() * 1000 );
        posyB = Math.floor( Math.random() * 100 );

    }



}

document.body.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function(event) {
    keys[event.keyCode] = false;
});


window.addEventListener("load",function(){
    loup();
});





