var cv      = null;
var context = null;

var width  = window.innerWidth;
var height = window.innerHeight;

var posx  = 10;
var posy  = 720-32;

left=false;
up=false;
right=false;
down=false

var vy = 10;
var vx = 10;


function setup() {
    cv = document.getElementById("cv");
    context = cv.getContext('2d');

    cv.width = width;
    cv.height = 720;

    context.fillStyle = "#000";
    context.fillRect(0,0,width,720);
}
setup();
function loup(){

    requestAnimationFrame(loup);

    context.clearRect(0,0,width,height)
    context.beginPath();
    context.fillStyle = "blue";
    context.fillRect(posx,posy,32,32);
    context.closePath();
    context.fill();
    console.log("test")
    //deplace();
    window.onkeydown = function(event){

        if(event.keyCode == 37){
            posx-=vx;
        }

        if(event.keyCode == 39) {
            posx+= vx;
        }
        if(event.keyCode == 40){
            posy += vy;

        }
        if(event.keyCode == 38){
            posy-= vy;
        }

        if (posx > width-32){
            console.log("false");
            right = false;

        }
        if (posx < 0){
            right = true;
        }


    }


}
loup()


