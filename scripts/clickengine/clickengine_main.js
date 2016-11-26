var canvas;
var ctx;
var clickengine = function() {};

clickengine.startGame = function(config) {
	var canvas = config.canvas;
	console.log(canvas);
	clickengine.initCanvas(canvas.id, canvas.width, canvas.height, canvas.scale);

    var loading = window.setInterval(clickengine.renderLoadingScreen, 100);

	Resources.loadImages({
        images: config.images,
        onload: function() {
            window.clearInterval(loading);
			config.init();

			window.requestAnimFrame(clickengine.gameloop.bind(
					this, config.update, config.render));

			window.onkeydown = Input.onkeydown;
			window.onkeyup = Input.onkeyup;
        }
    });
};

clickengine.initCanvas = function(id, width, height, scale) {
    canvas = document.getElementById(id);
    clickengine.width = width;
    canvas.width = width * scale;
    clickengine.height = height;
    canvas.height = height * scale;
	canvas.scale = scale;
    ctx = canvas.getContext('2d');
};

clickengine.gameloop = function(update, render) {
	clickengine.update(update);
	clickengine.render(render);

	window.requestAnimFrame(clickengine.gameloop.bind(
			this, update, render));
};

clickengine.update = function(update) {
	update();
    Input.update();
};

clickengine.render = function(render) {
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.scale(canvas.scale, canvas.scale);
	render();
	ctx.scale(1 / canvas.scale, 1 / canvas.scale);
};
