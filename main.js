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
            scale: 2
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
    dog.x = canvas.width/canvas.scale/2;
    dog.y = canvas.height/canvas.scale/2;
    dog.image = Resources.getImage(DOG_IMG);
    dog.setInteractionRect(8, 8, 48, 48);
    dog.setSolidRect(16, 16, 32, 32);

    frog = new clickengine.GameObject();
    frog.x = 208;
    frog.y = 16;
    frog.image = Resources.getImage(FROG_IMG);
    frog.animation.change(0, 0, 4);
    frog.setInteractionRect(0, 16, 60, 44);
    frog.setSolidRect(12, 28, 36, 20);

	baby = new clickengine.GameObject();
	baby.x = 25;
	baby.y = 128;
	baby.image = Resources.getImage(DOGBABY_IMG);
	baby.animation.frame_width = 32;
	baby.animation.frame_height = 32;
	baby.animation.change(0, 0, 3);
    baby.setInteractionRect(-8, 0, 48, 32);
    baby.setSolidRect(4, 8, 24, 16);

    bugs = [];
    for (var i = 0; i < 10; i++) {
        var bug = new clickengine.GameObject();
        bug.x = Math.floor(Math.random()*(clickengine.width-16));
        bug.y = Math.floor(Math.random()*(clickengine.height-16));
        bug.image = Resources.getImage("bug.png");
        bug.animation.frame_width = 16;
        bug.animation.frame_height = 16;
        bug.animation.change(0, 0, 1);
        bug.setInteractionRect(0, 0, 16, 16);
        bug.setSolidRect(7, 7, 2, 2);
        bugs.push(bug);
    }
}

function updateGame() {
    dog.update([baby, frog]);
	baby.update();
    dog.maybeHangOutWith(baby);
    frog.update();
    dog.maybeHangOutWith(frog);

    for (var i = bugs.length-1; i >= 0; i--) {
        if (bugs[i].interactionCollision(dog) && Input.isKeyPressed(Input.X)) {
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
    // Render background
	var text_color = "#FFFFFF";
	var bg_color = "#F36B72";
    ctx.fillStyle = bg_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render entities
    for (var i = bugs.length-1; i >= 0; i--) {
        bugs[i].render();
    }
    if (dog.y > frog.y + 8){
        frog.render();
        dog.render();
    } else {
        dog.render();
        frog.render();
    }
	baby.render();

    // Render speech
	var speak_config = {
		font_color: text_color,
		background_color: "#000000",
		font_size: 16,
		line_height: 20,
		horizontal_align: "left",
		vertical_align: "bottom",
		margin: 16,
	}
    if (dog.friend == frog) {
        if (dog.inventory.bugs < 10) {
            clickengine.speak(
                "hello lil doggy,\nplease catch me 10 bug",
                speak_config);
        } else {
            clickengine.speak(
                "congratulations! \ntrade me for my frog whistle?",
                speak_config);
        }
	}

	if (dog.friend == baby) {
		speak_config.horizontal_align = "left";
		speak_config.vertical_align = "top";
		clickengine.speak("hey cutie!", speak_config);
	}
}
