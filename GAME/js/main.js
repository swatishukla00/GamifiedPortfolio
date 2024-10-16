// Main: has access to DOM and contains SceneManager


// create SceneManager
const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

// handle DOM events
bindEventListeners();

// Render Loop 
render();


function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	

	window.onkeydown = handleKeyDown;
	window.onkeyup = handleKeyUp;

	// Add event listener for restarting the game
	window.addEventListener('keydown', function(event) {
		console.log("Key pressed: ", event.key); // Debugging line
		if (event.key === 'r' && gameEnded) { // Check if 'R' is pressed and game has ended
			sceneManager.restart(); // Call the restart function
			console.log("Game restarted"); // Debugging line
		}
	});
}

function resizeCanvas() {
	canvas.style.width  = '100%';
	canvas.style.height = '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function handleKeyDown(event) {
	var keyCode = event.which;
	sceneManager.handleInput(keyCode, true);
}

function handleKeyUp(event) {
	var keyCode = event.which;
	sceneManager.handleInput(keyCode, false);
}

function render() {

    requestAnimationFrame(render);
    sceneManager.update();
}



