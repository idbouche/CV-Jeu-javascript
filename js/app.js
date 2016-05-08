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
var blockx ;

var math = Math.floor( Math.random() * 1000);


var player ={
    posx    :10,
    posy    :720-64,
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
    if (player.x <= -1279){
        player.x = 0;
    }




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
    platform.fillRect(0,720-32,cv.width, 128);

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



        player.vy += player.gravity;

        player.posx += player.vx;
        player.posy += player.vy;

        if (player.posy >  720-92){
            player.posy =  720-92;
            player.jump = false;

        }

        //colision(4,250)



        if (player.posx >= cv.width/2){
            bgsp = 0.5;
            enime.posx -= 1;
            bonus.posx -= 1;

        }

        if ( keys[38] || keys[32] ) {
            if(!player.jump){
                player.jump = true;
                player.vy -= (player.speed * 2);
            }
        }

        cEnmis("red", 100);
        cEnmis("black",0);
        cEnmis("red", 150);

        cBlock(4,250,0);
        cBlock(5,350,100);
        cBlock(2,450,100);

        //with bonus
        if (player.posx+player.width >= bonus.posx  &&
            player.posx <= bonus.posx + bonus.width &&
            player.posy + player.height >= bonus.posy  &&
            player.posy <= bonus.posy + bonus.height){

            score++;

            var paragraph = document.createElement("P");
            var textparagraph= document.createTextNode("Water");
            paragraph.appendChild(textparagraph);
            document.getElementById("terminal").appendChild(paragraph);

            bonus.posx = Math.floor( Math.random() * 1000 );
            bonus.posy = Math.floor( Math.random() * 100 );

            if(bonus.posy <= cv.height - 400 && bonus.posy>= cv.height -100 &&
              bonus.posx <=50 && bonus.posx >= cv.width-50){
                bonus.posx = Math.floor( Math.random() * 1000 );
                bonus.posy = Math.floor( Math.random() * 100 );
            }
        }
    }

    requestAnimationFrame(loup);
}
var cBonus = function(color, n ){
    bonuss.fillStyle = color;
    bonuss.fillRect(n,n,bonus.width,bonus.height);

}

var cEnmis = function(color, n){
    enimes.fillStyle = color;
    enimes.fillRect(enime.posx + n,enime.posy,enime.width,enime.height);
    if (player.posx + player.width>= enime.posx + n &&
    player.posx <= enime.posx + enime.width + n  &&
    player.posy+ player.height >= enime.posy  &&
    player.posy <= enime.posy + enime.height){
        player.posx  = 10;
        player.posy  = 720-64;
    }
}

var cBlock = function(n, p, x){
    var block = new Image();
    block.src = "../png/Objects/StoneBlock32.png";
    blockx= 0 ;
    if (player.posx >= cv.width/2){
        blockx ++;
    }
    for (var i = 0; i< n ; i++){

        players.beginPath();
        platform.drawImage(block,
                           blockx,
                           0,
                           32,32,
                           cv.width/2+x+(32*i),
                           cv.height-p,
                           32,32
                          );
        players.closePath();
        players.fill();
    }

    colision (n, p, x)
}

var colision = function(n, p, x){
    if (player.posy >=cv.height- p - player.width && player.posx>=(cv.width/2)-36+x &&player.posx<=(cv.width/2)+(23*n)+x && player.posy <= cv.height - p + 22 ){
        player.posy =cv.height - p - player.height;
        player.jump = false;

    }
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








