function collision(a, b) {
	return (((a.x >= b.x && a.x <= b.x + b.animation.frame_width) 
		|| (a.x + a.animation.frame_width >= b.x 
			&& a.x + a.animation.frame_width <= b.x + b.animation.frame_width))
		&& ((a.y >= b.y && a.y <= b.y + b.animation.frame_height)
		|| (a.y + a.animation.frame_height >= b.y 
			&& a.y + a.animation.frame_height <= b.y + b.animation.frame_height)));
}

function speak(text, config) {
	var font_size = config.font_size || 24;
	
	ctx.font = font_size + "px Verdana";
	ctx.textBaseline = "top";
	
	var x_offset = config.margin || font_size;
	var horizontal_align = config.horizontal_align || "left";
	var vertical_align = config.vertical_align || "top";
	var y_offset = config.margin || font_size;
	var line_height = config.line_height || font_size
	var padding = config.padding || 8;
	
	var lines = text.split("\n");
	var longest = 0;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		var width = ctx.measureText(line).width;
		if (width > longest)
			longest = width;
	}
	
	if (horizontal_align == "right") {
		x_offset = canvas.width - x_offset * 2 - width;
	}
	
	var font_color = config.font_color;
	var background_color = config.background_color;
	if (vertical_align == "top") {
		ctx.fillStyle = background_color;
		ctx.fillRect(
			x_offset, 
			y_offset, 
			width + padding * 2, 
			lines.length * line_height + padding * 2);
			
		ctx.fillStyle = font_color;
		let y = y_offset + padding;
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			ctx.fillText(line, x_offset + padding, y);
			y += line_height;
		}
	} else if (vertical_align == "bottom") {
		ctx.fillStyle = background_color;
		ctx.fillRect(
			x_offset, 
			canvas.height - lines.length * line_height - padding * 2 - y_offset, 
			width + padding * 2, 
			lines.length * line_height + padding * 2);
			
		y = canvas.height - y_offset * 2 - font_size;

		ctx.fillStyle = font_color;
		for (let i = lines.length-1; i >= 0 ; i--) {
			let line = lines[i];
			ctx.fillText(line, x_offset + padding, y);
			y -= line_height;
		}
	}
}