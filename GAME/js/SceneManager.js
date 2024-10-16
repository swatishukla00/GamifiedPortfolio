function SceneManager(canvas) {

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    
    // INITIALISATION
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    
    var keyMap = [];

    var thePlane, theSkybox, theCoins, theEnemies;
    const dynamicSubjects = createSceneSubjects(scene);
    var theMissiles = [];

    // AMBIENT LIGHTING
    var ambientLight = new THREE.AmbientLight('#ffffff', 1.5);
    scene.add(ambientLight);

    var score = 0;
    var health = 5; // Set initial health to 5
    var gameEnded = false; // Ensure this variable is defined

    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        renderer.setClearColor("#222222");
        renderer.setSize(width, height);
        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 30;
        const nearPlane = 0.1;
        const farPlane = 3000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        
        camera.position.y = 0.65;
        return camera;
    }

    function createSceneSubjects(scene) {
        theSkybox = new Skybox(scene);
        thePlane = new Plane(scene);
        theCoins = placeCoins(scene);
        theEnemies = placeEnemies(scene);

        const dynSubjs = [ thePlane ];
        return dynSubjs;
    }

    this.update = function() {
        if (camera.position.z > -2400 && health > 0) {
            camera.position.z -= 0.4;

            for(let i = 0; i < dynamicSubjects.length; i++)
                if (dynamicSubjects[i].model) {
                    dynamicSubjects[i].update();
                }

            [theCoins, theEnemies, theMissiles, score, health] = checkCollision(thePlane, theCoins, theEnemies, theMissiles, score, health);

            theMissiles = deleteMissiles(theMissiles);

            // RENDERING
            renderer.render(scene, camera);

            // EXECUTING INPUT MOVEMENT
            if (thePlane.model) {
                thePlane.handleInput(keyMap, camera);
                
                if (keyMap[32]) {
                    const m = thePlane.launchMissile();
                    dynamicSubjects.push(m);
                    theMissiles.push(m);
                    keyMap[32] = false;
                }
            }

            // Update scoreboard with hearts instead of numbers
            document.getElementById("scoreboard").innerHTML = "HEALTH: " + "❤️".repeat(health) + " &emsp; SCORE: " + score; 
        } else if (!gameEnded) {
            gameEnded = true; // Set gameEnded to true when the game is over
            if (health <= 0) {
                document.getElementById("gameover").innerHTML = "YOU LOST"; 
            } else {
                document.getElementById("gameover").innerHTML = "GAME OVER"; 
            }
        }
    }

    this.onWindowResize = function() {
        const { width, height } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    this.handleInput = function(keyCode, isDown) {
        keyMap[keyCode] = isDown;
    }

    this.restart = function() {
        score = 0; // Reset score
        health = 5; // Reset health to 5
        gameEnded = false; // Reset game state
        camera.position.z = 0; // Reset camera position
        dynamicSubjects.length = 0; // Clear dynamic subjects
        theCoins = placeCoins(scene); // Recreate coins
        theEnemies = placeEnemies(scene); // Recreate enemies
        document.getElementById("gameover").innerHTML = ""; // Clear game over message
        document.getElementById("scoreboard").innerHTML = "HEALTH: " + "❤️".repeat(health) + " &emsp; SCORE: " + score; // Update scoreboard
    }

    // Initial scoreboard setup
    document.getElementById("scoreboard").innerHTML = "HEALTH: " + "❤️".repeat(health) + " &emsp; SCORE: " + score; 
}
