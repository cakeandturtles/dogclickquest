var dog;
var frog;
var baby;
var bugs;

var DOG_IMG = "dogsheet.png";
var DOGBABY_IMG = "dogbabysheet.png";
var FROG_IMG = "frogsheet.png";

function main(){
    clickengine.startGame({
        canvas: {
            id: "dogcanvas",
            width: 320,
            height: 320,
            scale: 1
        },
        images: [DOG_IMG, DOGBABY_IMG, FROG_IMG, "bug.png"],
        init: initGame,
        update: updateGame,
        render: renderGame
    });
}
window.onload = main;


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
	baby.x = 25;
	baby.y = 128;
	baby.image = Resources.getImage(DOGBABY_IMG);
	baby.animation.frame_width = 16;
	baby.animation.frame_height = 16;
	baby.animation.change(0, 0, 2);
    
    bugs = [];
    for (var i = 0; i < 10; i++) {
        var bug = new Animal();
        bug.x = Math.floor(Math.random()*(clickengine.width-16));
        bug.y = Math.floor(Math.random()*(clickengine.height-16));
        bug.image = Resources.getImage("bug.png");
        bug.animation.frame_width = 16;
        bug.animation.frame_height = 16;
        bug.animation.change(0, 0, 1);
        bugs.push(bug);
    }
}

function updateGame() {
    dog.update();
	baby.update();
    frog.update();
    
    for (var i = bugs.length-1; i >= 0; i--) {
        if (bugs[i].collision(dog)) {
            if ('bugs' in dog.inventory) {
                dog.inventory.bugs++;
            } else {
                dog.inventory.bugs = 1;
            }
            bugs.splice(i, 1);
        }
    }
}

function renderGame() {
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
		font_size: 16,
		line_height: 20,
		horizontal_align: "left",
		vertical_align: "bottom",
		margin: 16,
	}
	if (frog.collision(dog)) {
        if (dog.inventory.bugs < 10) {
            clickengine.speak("hello lil doggy,\nplease catch me 10 bug", speak_config);
        } else {
            clickengine.speak("congratulations! \ntrade me for my frog whistle?", speak_config);
        }
	}
	
	if (baby.collision(dog)) {
		speak_config.horizontal_align = "left";
		speak_config.vertical_align = "top";
		clickengine.speak("cutie!", speak_config);
	}
    
    for (var i = bugs.length-1; i >= 0; i--) {
        bugs[i].render();
    }
}