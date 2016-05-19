var cv      = null;
var score   = 0;

var context = null;
var players  = null;
var enimes   = null;
var platform= null;
var bonuss   = null;

var textscore= null;
var textConpetence= 'TEST';
var textResultats ='';

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
        posx    :2250,
        posy    :100,
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
        sy      :4
    }
}
var createBonus= function(){
    return {
    posx    :2000,
    posy    :100,
    x       :0,
    y       :0,
    speed   :8,
    jump    :false,
    vy      :2,
    vx      :2,
    width   :32,
    height  :32,
    cont    :0,
    color   :''
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
    var posx = 10;
    var posy = 20;
    for (var i=0; i<5; i++){
        posx += 100;
        posy += 5;
        var enime = O();
        T.push(enime);
        T[i].posx +=posx;
        T[i].posy +=posy;
    }
}
ctreat(tabEnmis,createEnmi)
ctreat(tabbonus,createBonus)
ctreat(tabblock,createBlock)
console.log(tabEnmis);
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

    textscore.fillStyle = "#ffffff";
    textscore.font="30px Arial";
    textscore.fillText("             " +score,10,50);

    textscore.fillStyle = "#ffffff";
    textscore.font="30px Arial";
    textscore.fillText("Resultats : " +textResultats,window.innerWidth-400,50);

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
        var h1= 350;
        var h2=0;
        for (var j=0; j<5; j++){

            cEnmis(tabEnmis[j],h1,h2);
            h1 += -40;
            h2 += 5;

        }

        cBlock(tabblock[0],400,270,'#c43235',textConpetence);
        cBlock(tabblock[1],559,200,'#c43235',textConpetence);
        cBlock(tabblock[2],800,270,'#c43235',textConpetence);

        cBonus(tabbonus[0],"#e91e63",230,0,'H');
        cBonus(tabbonus[1],"#e91e63",180,10,'T');
        cBonus(tabbonus[2],"#e91e63",300,20,'M');
        cBonus(tabbonus[3],"#e91e63",350,5,'L');
        cBonus(tabbonus[4],"#e91e63",320,15,'C');

    }

    requestAnimationFrame(loup);
}
var cBonus = function(B,color,H1,H2,text ){
    B.color = color;
    bonuss.fillStyle = "rgba(0,0,0,0)";
    bonuss.fillRect(B.posx,B.posy,B.width,B.height);

    context.font="30px Arial";
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

        console.log(B.text);
        console.log(tabtext);
        B.posx  = 2500;
        score +=1;
        /*var phrase ="Vous avez débloqué une compétence  "
        var copitence ;
        var balise = document.createElement("P");
        var terminal = document.getElementById('terminal');
        var affichage = function(T){
            copitence = phrase + T;
            var textnode = document.createTextNode(copitence);
            balise.appendChild(textnode);
            terminal.appendChild(balise);
        }*/
        var mybar = 'myBar';
        var Hvalue = 100 - (score * 25);
        window.document.getElementById(mybar).style.height =Hvalue+"%";

        var res = textConpetence.toUpperCase().split("");
        for (var i=0; i<= res.length; i++){
            if(res[i] == B.text){
                tabtext[i]=B.text;
                console.log("push")
            }
        }
        textResultats = tabtext.join("");
        switch(score) {
            case 5:
                //affichage("Html ");
                textConpetence = "HTML"
                break;
            case 10:
                //affichage("Css ");
                textConpetence ="CSS"
                break;
            case 15:
                //affichage("Javascript ");
                textConpetence ="JAVASCRIPT"
                break;
            case 20:
                //affichage("Boostrapp ");
                textConpetence ="BOOSTRAPP" + "JQUERY"
                //affichage("Jquery ");
                break;
            case 25:
                //affichage("Angolare js ");
                textConpetence ="ANGOLAREJS"
                break;
            case 30:
                //affichage("MongoDB ");
                //affichage("Expressjs ");
                textConpetence ="MONGODB "+"EXPRESSJS"
                break;
            case 35:
                //affichage("Nodejs ");
                textConpetence ="NODEJS"
                break;
            case 35:
                //affichage("Php ");
                //affichage("Django python ");
                textConpetence ="PHP " +"DJANGO PYTHON"
                break;
        }

    }

 }

var cEnmis = function(E,H1,H2){
    var el;
    var e = new Image();
    e.src = "../img/smith.png";
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
        player.posx  = 10;
        player.posy  = cv.height-64;
    }
    E.posx += E.vx;
    E.posy += E.vy;
}

var cBlock = function( BL,x, y,color,text){
    BL.posx = x;
    BL.posy = y;
    BL.color = color;
    BL.text = text;
    console.log(text)
    switch(text) {
        case 'HTML'||'CSS':
            BL.width = 57;
            break;
        case 'JAVASCRIPT'||'BOOSTRAPP'||'ANGOLAREJS':
            BL.width = 130;
            break;
        case 'MONGODB':
            BL.width = 95;
            break;
        case 'NODEJS':
            BL.width = 90;
            break;
        case 'DJANGO PYTHON':
            BL.width = 180;
            break;
        case 'TEST':
            BL.width = 50;
            break;
    }
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillRect(BL.posx,BL.posy,BL.width,BL.height);
    context.fillStyle = BL.color;
    context.font="30px Arial";
    console.log(BL.text);
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








