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

var posxB  = 100;
var posyB  = 100;

left=false;
up=false;
right=false;
down=false

var vy = 30;
var vx = 10;


function setup() {
    cv = document.getElementById("cv");
    context  = cv.getContext('2d');
    player   = cv.getContext('2d');
    enime    = cv.getContext('2d');
    platform = cv.getContext('2d');
    bonus    = cv.getContext('2d');
    textscore= cv.getContext('2d');

    cv.width = width;
    cv.height = 720;

    context.fillStyle = "#000";
    context.fillRect(0,0,width,720);

    platform.fillStyle = "green";
    platform.fillRect(0,720-32,width,32);

    bonus.fillStyle = "yellow";
    bonus.fillRect(posxB,posyB,32,32);

    enime.fillStyle = "red";
    enime.fillRect(posxE,posyE,32,32);
}


function loup(){

    requestAnimationFrame(loup);
    setup();

//@@@@@@@@@ Created player @@@@@@@@@@\\

    player.beginPath();
    player.fillStyle = "blue";
    player.fillRect(posx,posy,32,32);
    player.closePath();
    player.fill();

//@@@@@@@@@ Created Textscore @@@@@@@@@@\\

    textscore.fillStyle = "white";
    textscore.font = "30px Arial";
    textscore.fillText("Score : " +score,10,50);

//@@@@@@@@@ Moving player @@@@@@@@@@\\

    window.onkeydown = function(event){
        player.clearRect(posx,posy,32,32);
        if(event.keyCode == 37){
            posx-=vx;
        }

        if(event.keyCode == 39) {
            posx+= vx;

        }
       /* if(event.keyCode == 40){
            posy += vy;

        }*/
        if(event.keyCode == 38){
            posy-= vy;
            //player.gravity = 0.1;
        }


//@@@@@@@@@ collisione player @@@@@@@@@@\\

        if (posx > width-32){
            posx = width - 32;
        }
        if (posx < 0){
            posx = 0;
        }

// With Platform.
        if (posy > 720-64){
            posy = 720-64;

        }
// With Enime.
        if (posx >= posxE  &&  posx <= posxE + 32 && posy >= posyE  &&  posy <= posyE + 32){
            posx  = 10;
            posy  = 720-64;
            console.log("enime")
        }
//with bonus
        if (posx >= posxB  &&  posx <= posxB + 32 && posy >= posyB  &&  posy <= posyB + 32){
            score++;
            bonus.clearRect(posxB,posyB,32,32);
        }
//@@@@@@@@@ Gravity player @@@@@@@@@@\\


        window.onkeyup = function(event){
            if(event.keyCode == 38){
                posy = 720-32;
            }
            if (posy > 720-64){
                posy = 720-64;

            }
        }

    }



}
loup()


