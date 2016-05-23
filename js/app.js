var cv      = null;
var score   = 0;
var live   = 4;

var context = null;
var players  = null;
var enimes   = null;
var platform= null;
var bonuss   = null;

var textscore= null;
var textConpetence= 'CSS';
var textResultats ='';
var tabHeight = {H2:[350,300,330,250,310,345,290,280,240,260,320,200,270,230,190,210,370],
                 H1:[35,30,0,20,10,35,90,28,40,60,32,20,27,23,10,21,30]}

var bgsp    = 0;
var xpl     = 0;
var keys    = [];
var blockx  = 0;

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
var createEnmi= function(){
    return {
        posx    :1400,
        posy    :80,
        x       :0,
        y       :0,
        speed   :8,
        jump    :false,
        vy      :2,
        vx      :2,
        width   :35,
        height  :35,
        cont    :0,
        color   :'',
        sx      :this.width*0,
        sy      :4,
        h1      :350,
        h2      :1
    }
}
var createBonus= function(){
    return {
        posx    :1600,
        posy    :110,
        x       :0,
        y       :0,
        speed   :8,
        jump    :false,
        vy      :2,
        vx      :2,
        width   :32,
        height  :32,
        cont    :0,
        color   :'',
        h1      :390,
        h2      :3
    }
}
var createBlock= function(){
    return {
    posx    :0,
    posy    :0,
    width   :0,
    height  :32,
    color   :'',
    text    :''
    }
}

var tabEnmis = [];
var tabblock = [];
var tabbonus = [];
var tabtext  = [];

//ctreat(tabEnmis,createEnmi)
var ctreat = function(T,O){
    var posx= 350;
    var posy=0;
    for (var i=0; i<17; i++){
        var objet = O();
        T.push(objet);
        O().posx += 5;

    }
}
ctreat(tabEnmis,createEnmi)
ctreat(tabbonus,createBonus)
ctreat(tabblock,createBlock)
function setup() {

    cv        = document.getElementById("cv");
    context   = cv.getContext('2d');
    Bg        = cv.getContext('2d');
    enimes    = cv.getContext('2d');
    platform  = cv.getContext('2d');
    bonuss    = cv.getContext('2d');
    textscore = cv.getContext('2d');

    cv.width  = 1800;
    cv.height = 400;

    var pl = new Image();
    pl.src = "img/sprit.png";
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

    textscore.fillStyle = "#ffffff";
    textscore.font=" bold 30px Monospace";
    textscore.fillText("      " +score,10,50);

    textscore.fillStyle = "#ffffff";
    textscore.font=" bold 30px Monospace";
    textscore.fillText("Lives : " +live,200,50);

    textscore.fillStyle = "#ffffff";
    textscore.font=" bold 30px Monospace";
    textscore.fillText("Resultats : " +textResultats,window.innerWidth-450,50);


}

var timeS
function loup(timestamp){

     var diff= 0;
    if (timeS){
        diff = -timeS + timestamp;
    }else {
        timeS = timestamp;
    }

    if (diff >= 10){
       diff =0;
        timeS = 0;
        setup();

        if (player.posx >= 1000){
            bgsp = 0.8;
            if(keys[37]){
                blockx -=2;
                player.sy = player.height * 9;
            }
            if(keys[39]) {
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
                document.getElementById("start").style.display = 'none';

            }
        }

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

        if ( keys[38] || keys[32] ) {
            if(!player.jump){
                player.jump = true;
                player.vy -= (player.speed * 2);
            }
        }

        for (var j=0; j<3; j++){
            tabEnmis[j].h1 = tabHeight.H2[j];
            tabEnmis[j].h2 = tabHeight.H1[j];
            cEnmis(tabEnmis[j],tabEnmis[j].h1,tabEnmis[j].h2);
        }

        cBlock(tabblock[0],400,270,'#e91e63',textConpetence);
        cBlock(tabblock[1],559,200,'#e91e63',textConpetence);
        cBlock(tabblock[2],800,270,'#e91e63',textConpetence);

        for (var i = 0; i< textConpetence.length; i++){                                    cBonus(tabbonus[i],"#e91e63",tabbonus[i].h1,tabbonus[i].h2,textConpetence[i]);
            tabbonus[i].h1 = tabHeight.H2[i];
            tabbonus[i].h2 = tabHeight.H1[i];
        }

    }

    requestAnimationFrame(loup);
}
var cBonus = function(B,color,H1,H2,text ){
    B.color = color;
    bonuss.fillStyle = "rgba(0,0,0,0)";
    bonuss.fillRect(B.posx,B.posy,B.width,B.height);

    context.font="bold 30pt Monospace";
    B.text = text;
    context.fillStyle = B.color;
    context.fillText(B.text,B.posx,B.posy+25,B.width);
    if(B.posx >= cv.width || B.posx <= 0){
        B.vx *= -1;
    }
    if(B.posy+B.height >= H1 || B.posy <= H2){
        B.vy *= -1;
    }
    B.posx += B.vx;
    B.posy += B.vy;

    if (colision(player,B)){

        B.posx  = 1400;
        score +=1;
        var res = textConpetence.toUpperCase().split("");
        for (var i=0; i<= res.length; i++){
            if(res[i] == B.text){
                tabtext[i]=B.text;
            }
        }
        textResultats = tabtext.join("");

        switch(textResultats) {
            case "CSS":
                bar('myBar');
                tabtext=[];
                textConpetence = "HTML";
                break;
            case "HTML":
                bar('myBar2');
                tabtext=[];
                textConpetence ="NODEJS";
                break;
            case "NODEJS":
                bar('myBar3');
                tabtext=[];
                textConpetence ="JAVASCRIPT";
                break;
            case "JAVASCRIPT":
                bar('myBar4');
                tabtext=[];
                textConpetence ="ANGOLAREJS";
                break;
            case "ANGOLAREJS":
                bar('myBar5');
                tabtext=[];
                textConpetence ="BOOSTRAPPJQUERY";
                break;
            case "BOOSTRAPPJQUERY":
                bar('myBar6');
                tabtext=[];
                textConpetence ="PHPDJANGOPYTHON";
                break;
            case "PHPDJANGOPYTHON":
                bar('myBar7');
                tabtext=[];
                textConpetence ="MONGODBEXPRESSJS";

                break;
            case "MONGODBEXPRESSJS":
                bar('myBar8');
                game();
                break;
        }

    }

 }
var bar = function(mybar){
    var Hvalue = 100 -  (tabtext.length*100/textConpetence.length);
    window.document.getElementById(mybar).style.height = Hvalue + "%";

}
var cEnmis = function(E,H1,H2){
    var el;
    var e = new Image();
    e.src = "img/smith.png";
    el = cv.getContext('2d');
    E.cont  += 0.2;
    E.sx     = Math.floor(E.cont % 8);
    el.beginPath();
    context.drawImage(e,
                      E.width*E.sx,
                      E.sy,
                      E.width,
                      E.height,
                      E.posx,
                      E.posy,
                      E.width,
                      E.height
                     );
    el.closePath();
    el.fill();
    if(E.posx >= cv.width || E.posx <= 0){
        E.vx *= -1;
    }
    if(E.posy+E.height >= H1 || E.posy <= H2){
        E.vy *= -1;
    }

    if (colision(player,E)){
        live--;
        E.posx  = 1400;
        if(live === 0){
            show();
        }
    }
    E.posx += E.vx;
    E.posy += E.vy;
}

var cBlock = function( BL,x, y,color,text){
    BL.posx = x;
    BL.posy = y;
    BL.color = color;
    BL.text = text;

    switch(text) {
        case 'HTML':
        case'CSS':
        case'PHP':
            BL.width = 57;
            break;
        case'JAVASCRIPT':
        case'BOOSTRAPP':
        case'ANGOLAREJS':
            BL.width = 130;
            break;
        case 'MONGODB':
        case'EXPRESS':
            BL.width = 95;
            break;
        case 'NODEJS':
            BL.width = 90;
            break;
        case 'DJANGOPYTHON':
            BL.width = 180;
            break;
        case 'TEST':
            BL.width = 50;
            break;
    }
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillRect(BL.posx,BL.posy,BL.width,BL.height);
    context.fillStyle = BL.color;
    context.font="blod 30px Monospace";


    context.fillText(BL.text,BL.posx,BL.posy+25,BL.width);
    if (colision(player,BL,"b")){
        player.posy  = BL.posy - player.height;
    }
}


var rangeIntersect = function(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) &&
        Math.min(min0, max0) <= Math.max(min1, max1);
}

var colision = function(r0, r1, b) {
    if(b == "b"){
        return rangeIntersect(r0.posx + (r0.width/2), r0.posx  - (r0.width/2), r1.posx, r1.posx + (r1.width/2)) &&
            rangeIntersect(r0.posy, r0.posy + r0.height, r1.posy, r1.posy + r1.height);
    }
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
 var show = function(){
     document.getElementById("gameover").style.display = 'block';
     document.getElementById("game").style.display = 'none';
     document.getElementById("show").style.display = 'none';
 }
 var game = function(){
     document.getElementById("gameover").style.display = 'none';
     document.getElementById("game").style.display = 'block';
     document.getElementById("show").style.display = 'block';
 }







