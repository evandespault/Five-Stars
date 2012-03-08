/* Author: Evan Despault
*/

var canvas;
var context;
var winX, winY;
var resizeTimeoutId;

var x, y;


/* Add window resize listener */
Sys.Application.add_load (
	function (sender, args) {
		$addHandler (window, "resize", window_resize);
	}
);

/* Initialize the canvas */
function init () {
	canvas = document.getElementById ("main_canvas");

	if (context = canvas.getContext ("2d")) {

		/* Draw the field */
		getWindowSize ();
		drawField ();

		/* Draw the player */
		x = winX / 2;
		y = winY / 2;
		drawPlayer ();

		window.onresize = window_resize;
		window.addEventListener ('keydown', key_press, true);
	}
}

/* Set winX and winY to the current width and height of the window */
function getWindowSize () {
	if (document.body && document.body.offsetWidth) {
		winX = document.body.offsetWidth;
		winY = document.body.offsetHeight;
	}
	if (document.compatMode == "CSS1Compat"
			&& document.documentElement
			&& document.documentElement.offsetWidth) {
		winX = document.documentElement.offsetWidth;
		winY = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winX = window.innerWidth;
		winY = window.innerHeight;
	}
}

function redraw () {
	getWindowSize ();
	drawField ();
	drawPlayer ();
}

function drawField () {
	canvas.width = winX;
	canvas.height = winY;
	context.fillStyle = "#000000";
	context.fillRect (0, 0, window.innerWidth, window.innerHeight);
}

function drawPlayer () {
	context.strokeStyle = "#FFFFFF";
	context.fillStyle = "#FFFF00";
	context.beginPath ();
	context.arc (x, y, 10, 0, Math.PI*2, true);
	context.closePath ();
	context.stroke ();
	context.fill ();
}

function window_resize (e) {
	window.clearTimeout (resizeTimeoutId);
	resizeTimeoutId = window.setTimeout ("redraw();", 10);
}

function key_press (e) {
	switch (e.keyCode) {
		case 38:		// up
			y -= 10;
			break;
		case 40:		// down
			y += 10;
			break;
		case 37:		// left
			x -= 10;
			break;
		case 39:		// right
			x += 10;
			break;
	}
	redraw();
}

