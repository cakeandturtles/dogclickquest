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

function initGame() {    
    dog = new Dog();
    dog.x = 128;
    dog.y = 128;
    dog.image = Resources.getImage(DOG_IMG);
    
    frog = new Animal();
    frog.x = 208;
    frog.y = 16;
    frog.image = Resources.getImage(FROG_IMG);
    frog.animation.change(0, 0, 4);
    
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
	
	if (((dog.x >= frog.x && dog.x <= frog.x + frog.animation.frame_width) 
		|| (dog.x + dog.animation.frame_width >= frog.x 
			&& dog.x + dog.animation.frame_width <= frog.x + frog.animation.frame_width))
		&& ((dog.y >= frog.y && dog.y <= frog.y + frog.animation.frame_height)
		|| (dog.y + dog.animation.frame_height >= frog.y 
			&& dog.y + dog.animation.frame_height <= frog.y + frog.animation.frame_height))) 
	{
		speak("hello lil doggy\nhow are you doing?", text_color, bg_color);
	}
}

// TODO(jakeonaut): allow horizontal or vertical alignment (left/right and top/bottom)
//	will need to reverse for loop for top alignment
//	need to use measureText width to adjust position of left position on fillText
function speak(text, text_color, bg_color) {
	var line_height = 16;
	
	ctx.font = line_height + "px Verdana";
	
	var y_offset = 64 - line_height*2;
	var y_kerning = 4;
	
	var lines = text.split("\n");
	for (var i = lines.length-1; i >= 0; i--) {
		var line = lines[i];
		
		ctx.fillStyle = "#000000";
		ctx.fillRect(16 - y_kerning, y_offset - y_kerning, 
			ctx.measureText(line).width + y_kerning * 2, 16 + y_kerning * 2);
		ctx.fillStyle = text_color;
		ctx.fillText(line, 16, y_offset + 14);
		y_offset -= (line_height + y_kerning);
	}
}