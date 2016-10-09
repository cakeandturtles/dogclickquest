var canvas;
var ctx;
var dog;
var frog;

var DOG_IMG = "dogsheet.png";
var DOGBABY_IMG = "dogbabysheet.png";
var FROG_IMG = "frogsheet.png";

function main(){
    initCanvas();
    
    let loading = window.setInterval(renderLoadingScreen, 100);
    
    Resources.loadImages({
        images: [DOG_IMG, DOGBABY_IMG, FROG_IMG], 
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
    canvas.width = 640;
    canvas.height = 640;
    ctx = canvas.getContext("2d");
}

function initGame() {    
    dog = new Dog();
    dog.x = canvas.width/2;
    dog.y = canvas.height/2;
    dog.image = Resources.getImage(DOG_IMG);
    
    frog = new Animal();
    frog.x = 208;
    frog.y = 16;
    frog.image = Resources.getImage(FROG_IMG);
    frog.animation.change(0, 0, 4);
	
	baby = new Animal();
	baby.x = 400;
	baby.y = 128;
	baby.image = Resources.getImage(DOGBABY_IMG);
	baby.animation.frame_width = 32;
	baby.animation.frame_height = 32;
	baby.animation.change(0, 0, 2);
    
    window.setInterval(function() {
        update();
        render();
    }, 33);
    
    //set up input manager
    window.onkeydown = Input.onkeydown;
    window.onkeyup = Input.onkeyup;
}

function update() {
    dog.update();
	baby.update();
    frog.update();
    
    //update input manager
    Input.update();
}

function render() {
	var text_color = "#FFFFFF";
	var bg_color = "#F36B72";
    ctx.fillStyle = bg_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    if (dog.y > frog.y + 8){
        frog.render();
        dog.render();
    } else {
        dog.render();
        frog.render();
    }
	baby.render();
	
	var speak_config = { 
		font_color: text_color, 
		background_color: "#000000", 
		font_size: 24,
		line_height: 32,
		horizontal_align: "left",
		vertical_align: "bottom",
		margin: 16,
	}
	if (collision(dog, frog)) {
		speak("hello lil doggy,\nplease catch me 10 bug", speak_config);
	}
	
	if (collision(dog, baby)) {
		speak_config.horizontal_align = "right";
		speak_config.vertical_align = "top";
		speak("cutie!", speak_config);
	}
}