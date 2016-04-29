var cv      = null;
var score   = 0;

var context = null;
var players  = null;
var enimes   = null;
var platform= null;
var bonuss   = null;

var textscore= null;

var bgsp   = 0.8;
var xpl     = 0;
var keys    = [];

var paragraph = document.createElement("P");
var textparagraph= document.createTextNode("Water");

var player ={
    posx    :10,
    posy    :300,
    x       :0,
    y       :0,
    speed   :8,
    friction:0.01,
    gravity :0.4,
    jump    :false,
    vy      :0,
    vx      :0,
    width   :64,
    height  :64,
    cont    :0,
    sx      :this.width*0,
    sy      :this.height*11
}
var enime ={
    posx    :150,
    posy    :500,
    x       :0,
    y       :0,
    speed   :8,
    jump    :false,
    vy      :0,
    vx      :0,
    width   :32,
    height  :32,
    cont    :0
}
var bonus ={
    posx    :Math.floor( Math.random() * 1000),
    posy    :Math.floor( Math.random() * 1000),
    x       :0,
    y       :0,
    speed   :8,
    jump    :false,
    vy      :0,
    vx      :0,
    width   :32,
    height  :32,
    cont    :0
}

function setup() {


    cv        = document.getElementById("cv");
    context   = cv.getContext('2d');
    Bg        = cv.getContext('2d');
    enimes    = cv.getContext('2d');
    platform  = cv.getContext('2d');
    bonuss    = cv.getContext('2d');
    textscore = cv.getContext('2d');

    cv.width  = 600;
    cv.height = 800;

    var bg = new Image();
    bg.src = "../png/BG.png";
    player.x      -= bgsp
    context.drawImage(bg,player.x,player.y);
    if (player.x <= -1279)
        player.x = 0;


    var pl = new Image();
    pl.src = "../img/sprit.png";
    players = cv.getContext('2d');
    player.cont  += 0.2;
    player.sx     = Math.floor(player.cont % 9);

    players.beginPath();
    context.drawImage(pl,
                    player.width*player.sx,
                    player.sy,
                    player.width,
                    player.height,
                    player.posx,
                    player.posy,
                    player.width,
                    player.height
                     );
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    players.closePath();
    players.fill();


    var pla = new Image();
    pla.src = "../png/Tile/2.png";
    var ptrn = platform.createPattern(pla, 'repeat');
    platform.fillStyle = ptrn;
    platform.fillRect(0,720-32,cv.width, 128);

    bonuss.fillStyle = "yellow";
    bonuss.fillRect(bonus.posx,bonus.posy,bonus.width,bonus.height);

    enimes.fillStyle = "red";
    enimes.fillRect(enime.posx,enime.posy,enime.width,enime.height);

    textscore.fillStyle = "white";
    textscore.fillText("Score : " +score,10,50);

    var block = new Image();
    block.src = "../png/Objects/StoneBlock32.png";
    //var ptrn = platform.createPattern(block, 'repeat');
    //platform.fillStyle = ptrn;
    platform.drawImage(block,cv.width/2,cv.height-200,32,32);
    platform.drawImage(block,cv.width/2+32,cv.height-200,32,32);
    platform.drawImage(block,cv.width/2+64,cv.height-200,32,32);
}

var timeS
function loup(timestamp){

     var diff= 0;
    if (timeS){
        diff = -timeS + timestamp;
    }else {
        timeS = timestamp;
    }

    //console.log(diff);
    if (diff >= 10){
       diff =0;
        timeS = 0;
        setup();
        if(keys[37]){
            player.posx += -5 ;
            //vx -= friction;
            player.sy = player.height * 9;

        }

        if(keys[39]) {
            player.posx += 5;
            //vx += friction;
            player.sy = player.height *11;

        }

        //@@@@@@@@@ collisione  player @@@@@@@@@@\\

        if (player.posx >=cv.width - player.width){
            player.posx = cv.width - player.width;
        }
        if (player.posx < 0){
            player.posx = 0;
        }
        //

        player.vy += player.gravity;

        player.posx += player.vx;
        player.posy += player.vy;

        if (player.posy >  720-92){
            player.posy =  720-92;
            player.jump = false;

        }

        if ( keys[38] || keys[32] ) {
            if(!player.jump){
                player.jump = true;
                player.vy += -(player.speed*2.5);
                player.sy  = player.height * 3;
                player.sx  = Math.floor( player.cont % 9);
            }
        }

        // With Platform.

        // With Enime.
        if (player.posx >= enime.posx  &&  player.posx <= enime.posx + enime.width && player.posy >= enime.posy  &&  player.posy <= enime.posy + enime.height){
            player.posx  = 10;
            player.posy  = 720-64;

        }
        //with bonus
        if (player.posx >= bonus.posx  &&  player.posx <= bonus.posx + bonus.width && player.posy >= bonus.posy  &&  player.posy <= bonus.posy + bonus.height){
            score++;
            bonus.posx = Math.floor( Math.random() * 1000 );
            bonus.posy = Math.floor( Math.random() * 100 );

            paragraph.appendChild(textparagraph);
            document.getElementById("terminal").appendChild(paragraph);

        }

    }


    requestAnimationFrame(loup);
    //player.clearRect(posx,posy,32,32);




}

document.body.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function(event) {
    keys[event.keyCode] = false;
    player.sy = player.height * 11;
    player.sx = 0;
});


window.addEventListener("load",function(){
    loup();
});








