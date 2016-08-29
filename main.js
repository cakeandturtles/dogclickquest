var canvas;
var ctx;
var dog;

function main(){
    canvas = document.getElementById("dogcanvas");
    canvas.width = 320;
    canvas.height = 320;
    ctx = canvas.getContext("2d");
    
    Resources.loadImage("dogsheet.png", function(img){
        dog = new Dog();
        dog.x = 128;
        dog.y = 128;
        dog.image = Resources.getImage("dogsheet");
        
        window.setInterval(function(){
            update();
            render();
        }, 33);
    });
}

function update(){
    dog.update();
}

function render(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dog.render();
}

window.onload = main;
