var cv      = null;
var score   = 0;

var context = null;
var players  = null;
var enimes   = null;
var platform= null;
var bonuss   = null;

var textscore= null;

var bgsp    = 0;
var xpl     = 0;
var keys    = [];
var blockx  = 0;

var math = Math.floor( Math.random() * 1000);


var player ={
    posx    :10,
    posy    :308,
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
    posy    :200,
    x       :0,
    y       :0,
    speed   :8,
    jump    :false,
    vy      :0,
    vx      :0,
    width   :32,
    height  :32,
    cont    :0,
    color   :''
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
    cont    :0,
    color   :''
}
var block ={
    posx    :0,
    posy    :0,
    width   :0,
    height  :32,
    color   :'',
    text    :''
}
console.log(innerWidth);


function setup() {


    cv        = document.getElementById("cv");
    context   = cv.getContext('2d');
    Bg        = cv.getContext('2d');
    enimes    = cv.getContext('2d');
    platform  = cv.getContext('2d');
    bonuss    = cv.getContext('2d');
    textscore = cv.getContext('2d');

    cv.width  = 3000;
    cv.height = 400;






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
    players.closePath();
    players.fill();


    var pla = new Image();
    pla.src = "../png/Tile/2.png";
    var ptrn = platform.createPattern(pla, 'repeat');
    platform.fillStyle = ptrn;
    platform.fillRect(0,cv.height-32,cv.width, 128);

    cBonus("yellow",math);
    cBonus("blue",math);
    cBonus("green",math);


    textscore.fillStyle = "white";
    textscore.fillText("Score : " +score,10,50);



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

        if (player.posx >= 1000){
            bgsp = 0.8;
            if(keys[37]){
                bonus.posx += 2;
                enime.posx -= 2;
                blockx -=2;
                player.sy = player.height * 9;
            }
            if(keys[39]) {
                bonus.posx -= 2;
                enime.posx -= 2;
                blockx +=2;
                player.sy = player.height *11;
            }
        }else{
            if(keys[37]){
                player.posx += -5 ;
                // vx -= friction;
                player.sy = player.height * 9;

            }

            if(keys[39]) {
                player.posx += 5;
                //vx += friction;
                player.sy = player.height *11;

            }
        }



        //@@@@@@@@@ collisione  player @@@@@@@@@@\\

        if (player.posx >=cv.width - player.width){
            player.posx = cv.width - player.width;
        }
        if (player.posx < 0){
            player.posx = 0;
        }



        player.vy += player.gravity;

        player.posx += player.vx;
        player.posy += player.vy;

        if (player.posy >=  cv.height-92){
            player.posy =  cv.height-92;
            player.jump = false;

        }

        //colision(4,250)





        if ( keys[38] || keys[32] ) {
            if(!player.jump){
                player.jump = true;
                player.vy -= (player.speed * 2);
            }
        }

        cEnmis("red", 100);
        cEnmis("blue",0);
        cEnmis("red", 150);



        cBlock(400,280,'javascript','red');
        cBlock(559,200,'html','green');
        cBlock(800,280,'mongoDB','blue');

    }
    var getr = getRandomIntInclusive(80,320);
    requestAnimationFrame(loup);
}
var cBonus = function(color, n ){
    bonus.color = color;
    bonus.posx = n;
    bonuss.fillStyle = bonus.color;
    bonuss.fillRect(bonus.posx,bonus.posy,bonus.width,bonus.height);
    if (colision(player,bonus)){
        bonus.posx  =  getRandomIntInclusive(80,320);
        bonus.posy  =  getRandomIntInclusive(0,500);

    }

}

var cEnmis = function(color, n){
    enime.color = color;
    enime.posx = n;
    enimes.fillStyle = enime.color;
    enimes.fillRect(enime.posx , enime.posy,enime.width,enime.height);
    if (colision(player,enime)){
        player.posx  = 10;
        player.posy  = cv.height-64;
    }

}

var cBlock = function( x, y,text,color){
    block.posx = x;
    block.posy = y;
    block.color = color;
    block.text = text;
    switch(text) {
        case 'html':
            block.width = 57;
            break;
        case 'javascript':
            block.width = 127;
            break;
        case 'mongoDB':
            block.width = 84;
            break;
        case 'nodejs':82;
            block.width
            break;
    }
    block.width
    context.fillStyle = block.color;
    context.font="30px Arial";
    block.text = text;
    context.fillText(block.text,block.posx,block.posy,block.width);
    console.log(block.width);
    console.log("block x: "+block.posx);
    console.log("player x: "+player.posx)
    if (colision(player,block)){
        player.posy  = block.posy-80;
    }


}


var rangeIntersect = function(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) &&
        Math.min(min0, max0) <= Math.max(min1, max1);
}

var colision = function(r0, r1) {
    return rangeIntersect(r0.posx, r0.posx + r0.width, r1.posx, r1.posx + r1.width) &&
        rangeIntersect(r0.posy, r0.posy + r0.height, r1.posy, r1.posy + r1.height);
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
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








