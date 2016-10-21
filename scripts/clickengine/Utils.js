clickengine.getCanvasMouseCoords = function(e) {
	var boundingRect = canvas.getBoundingClientRect();
	var coords = {
		x: e.pageX,
		y: e.pageY
	};
	coords.x -= boundingRect.left;
	coords.y -= boundingRect.top;
	
	coords.x /= canvas.scale;
	coords.y /= canvas.scale;
	return coords;
};

clickengine.collision = function(a, b) {
	return (((a.x >= b.x && a.x <= b.x + b.animation.frame_width) 
		|| (a.x + a.animation.frame_width >= b.x 
			&& a.x + a.animation.frame_width <= b.x + b.animation.frame_width))
		&& ((a.y >= b.y && a.y <= b.y + b.animation.frame_height)
		|| (a.y + a.animation.frame_height >= b.y 
			&& a.y + a.animation.frame_height <= b.y + b.animation.frame_height)));
};

window.requestAnimFrame = function() {
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();