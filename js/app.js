var cv      = null;
var score   = 0;
var background;
var clouds;
var floor;
var hour;
var period;

var context = null;
var player  = null;
var enime   = null;
var platform= null;
var bonus   = null;

var textscore= null;

var width  = 3000
var bgsp   = 0.8;
var x      = 0;
var y      = 0;
var posx   = 10;
var posy   = 300;
var xpl     = 0;

var posxE  = 150;
var posyE  = 500;

var posxB  = Math.floor( Math.random() * 1000);
var posyB  = Math.floor( Math.random() * 1000);

var speed    = 8 ;
var friction = 0.01;
var gravity  = 0.4;
var jumping  = false;
var vy = 0;
var vx = 0;

var keys    = [];
var sWidth  = 64;
var sHeight = 64;
var sx      = sWidth *  0 ;
var sy      = sHeight * 11;
var cont    = 0;


function setup() {


    cv = document.getElementById("cv");
    context  = cv.getContext('2d');
    Bg       = cv.getContext('2d');
    enime    = cv.getContext('2d');
    platform = cv.getContext('2d');
    bonus    = cv.getContext('2d');
    textscore= cv.getContext('2d');

    cv.width = innerWidth;
    cv.height = 800;

    var bg = new Image();
    bg.src = "../png/BG.png";
    x      -= bgsp
    context.drawImage(bg,x,y);
    if (x <= -1279)
        x = 0;


    var pl = new Image();
    pl.src = "../img/sprit.png";
    player = cv.getContext('2d');
    cont  += 0.2;
    sx     = Math.floor(cont % 9);

    player.beginPath();
    context.drawImage(pl,sWidth * sx,sy,sWidth,sHeight,posx,posy,sWidth,sHeight);
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    player.closePath();
    player.fill();


    var pla = new Image();
    pla.src = "../png/Tile/2.png";
    var ptrn = platform.createPattern(pla, 'repeat');
    platform.fillStyle = ptrn;
    platform.fillRect(xpl,720-32,cv.width, 128);

    bonus.fillStyle = "yellow";
    bonus.fillRect(posxB,posyB,32,32);

    enime.fillStyle = "red";
    enime.fillRect(posxE,posyE,32,32);

    textscore.fillStyle = "white";
    textscore.fillText("Score : " +score,10,50);

}


function loup(){
    setup();

    requestAnimationFrame(loup);
    //player.clearRect(posx,posy,32,32);


    if(keys[37]){
        posx -- ;
        //vx -= friction;
        sy = sHeight * 9;

    }

    if(keys[39]) {
        posx ++;
        //vx += friction;
        sy = sHeight * 11;

    }

    //@@@@@@@@@ collisione  player @@@@@@@@@@\\

    if (posx >=cv.width - 32){
        posx = cv.width - 32;
    }
    if (posx < 0){
        posx = 0;
    }
    //

    vy += gravity;

    posx += vx;
    posy += vy;

    if (posy >  720-92){
        posy =  720-92;
        jumping = false;

    }

    if ( keys[38] || keys[32] ) {
        if(!jumping){
            jumping = true;
            vy += -(speed*2);
            sy  = sHeight * 3;
            sx  = Math.floor( cont % 5);
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
    sy = sHeight * 11;
    sx = 0;
});


window.addEventListener("load",function(){
    loup();
});








