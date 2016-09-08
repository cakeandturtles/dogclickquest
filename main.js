var canvas;
var ctx;
var dog;
var frog;

var DOG_IMG = "dogsheet.png";
var FROG_IMG = "frogsheet.png";

function main(){
    initCanvas();
    
    let loading = window.setInterval(renderLoadingScreen, 100);
    
    Resources.loadImages({
        images: [DOG_IMG, FROG_IMG], 
        onload: function(){
            window.clearInterval(loading);
            initGame();
        }
    });
}
window.onload = main;

function renderLoadingScreen() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(16, canvas.height/2-8, canvas.width-32, 16);
    ctx.font = "20px Verdana";
    ctx.fillText("loading...", 16, canvas.height/2 - 32);
    
    var progress = Resources.getProgress();
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(17, canvas.height/2-7, ~~(progress*(canvas.width-32)), 14);
}

function initCanvas() {
    canvas = document.getElementById("dogcanvas");
    canvas.width = 320;
    canvas.height = 320;
    ctx = canvas.getContext("2d");
}

function initGame(){    
    dog = new Dog();
    dog.x = 128;
    dog.y = 128;
    dog.image = Resources.getImage(DOG_IMG);
    
    frog = new Animal();
    frog.x = 208;
    frog.y = 16;
    frog.image = Resources.getImage(FROG_IMG);
    frog.animation.change(0, 0, 4);
    
    window.setInterval(function(){
        update();
        render();
    }, 33);
    
    //set up input manager
    window.onkeydown = Input.onkeydown;
    window.onkeyup = Input.onkeyup;
}

function update(){
    dog.update();
    frog.update();
    
    //update input manager
    Input.update();
}

function render(){
    ctx.fillStyle = "#F36B72";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (dog.y > frog.y + 8){
        frog.render();
        dog.render();
    } else {
        dog.render();
        frog.render();
    }
}

