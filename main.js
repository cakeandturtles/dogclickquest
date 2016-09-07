var canvas;
var ctx;

var dog;
var frog;
var key_manager;

function main(){    
    //TODO: preload images with webworker,
    // assign images via calls to Resources.getImage
    Resources.loadImage("dogsheet.png", function(dog_img){
        Resources.loadImage("frogsheet.png", function(frog_img){
            
        });
    });
}

function init(){
    canvas = document.getElementById("dogcanvas");
    canvas.width = 320;
    canvas.height = 320;
    ctx = canvas.getContext("2d");
    
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

window.onload = main;
