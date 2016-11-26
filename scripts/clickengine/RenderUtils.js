clickengine.renderLoadingScreen = function() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(16, canvas.height/2-8, canvas.width-32, 16);
    ctx.font = "20px Verdana";
    ctx.fillText("loading...", 16, canvas.height/2 - 32);

    var progress = Resources.getProgress();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(17, canvas.height/2-7, ~~(progress*(canvas.width-32)), 14);
};

clickengine.speak = function(text, config) {
	var font_size = config.font_size || 24;

	ctx.font = font_size + "px Verdana";
	ctx.textBaseline = "top";

	var x_offset = config.margin || font_size;
	var horizontal_align = config.horizontal_align || "left";
	var vertical_align = config.vertical_align || "top";
	var y_offset = config.margin || font_size;
	var line_height = config.line_height || font_size
	var padding = config.padding || 8;
    var cwidth = canvas.width / canvas.scale;
    var cheight = canvas.height / canvas.scale;

	var lines = text.split("\n");
	var longest = 0;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let width = ctx.measureText(line).width;
		if (width > longest)
			longest = width;
	}

	if (horizontal_align == "right") {
		x_offset = cwidth - x_offset * 2 - longest;
	}

	var font_color = config.font_color;
	var background_color = config.background_color;
	if (vertical_align == "top") {
		ctx.fillStyle = background_color;
		ctx.fillRect(
			x_offset,
			y_offset,
			longest + padding * 2,
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
			cheight - lines.length * line_height - padding * 2 - y_offset,
			longest + padding * 2,
			lines.length * line_height + padding * 2);

		y = cheight - y_offset * 2 - font_size;

		ctx.fillStyle = font_color;
		for (let i = lines.length-1; i >= 0 ; i--) {
			let line = lines[i];
			ctx.fillText(line, x_offset + padding, y);
			y -= line_height;
		}
	}
};
