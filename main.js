var canvas;
var ctx;

var dog;
var frog;

function main(){
    canvas = document.getElementById("dogcanvas");
    canvas.width = 320;
    canvas.height = 320;
    ctx = canvas.getContext("2d");
    
    //TODO: preload images with webworker,
    // assign images via calls to Resources.getImage
    Resources.loadImage("dogsheet.png", function(dog_img){
        Resources.loadImage("frogsheet.png", function(frog_img){
            dog = new Dog();
            dog.x = 128;
            dog.y = 128;
            dog.image = Resources.getImage("dogsheet");
            
            frog = new Animal();
            frog.x = 208;
            frog.y = 16;
            frog.image = Resources.getImage("frogsheet");
            frog.animation.change(0, 0, 4);
            
            window.setInterval(function(){
                update();
                render();
            }, 33);
            
            //TODO: add KeyManager
            window.onkeydown = function(e){
                dog.animation.frame_delay = 3;
                var speed = 4;
                if (e.keyCode == 38) dog.y-=speed;
                if (e.keyCode == 40) dog.y+=speed;
                if (e.keyCode == 37) dog.x-=speed;
                if (e.keyCode == 39) dog.x+=speed;
            }
            
            window.onkeyup = function(e){
                dog.animation.frame_delay = 10;
            }
        });
    });
}

function update(){
    dog.update();
    frog.update();
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

window.onload = main;
