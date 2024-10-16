let coinsCollected = 0; // Counter for collected coins
let lastDamageTime = 0; // Cooldown timer for health decrement

// Add this function to create the coin info container and icons
function createCoinInfoContainer() {
  const coinInfoContainer = document.createElement("div");
  coinInfoContainer.id = "coin-info-container";
  coinInfoContainer.className = "coin-info-container";

  for (let i = 1; i <= 7; i++) {
    const iconDiv = document.createElement("div");
    iconDiv.className = "icons ";
    iconDiv.setAttribute("data-coin", i);
    iconDiv.id = "coin" + i;

    const img = document.createElement("img");
    img.src = `./assets/icons/${i}.png`; // Corrected the image source syntax

    iconDiv.appendChild(img);
    coinInfoContainer.appendChild(iconDiv);
  }

  document.body.appendChild(coinInfoContainer); // Append the container to the body
}

function checkCollision(
  thePlane,
  theCoins,
  theEnemies,
  theMissiles,
  score,
  health
) {
  if (thePlane.model) {
    const planeBB = new THREE.Box3().setFromObject(thePlane.model);
    let currentTime = performance.now(); // Get the current time
    let healthDecremented = false; // Flag to track if health has been decremented

    // HANDLING COINS COLLISION
    for (let i = theCoins.length - 1; i >= 0; i--) {
      if (theCoins[i]) {
        const coinBB = new THREE.Box3().setFromObject(theCoins[i].model);
        if (planeBB.intersectsBox(coinBB)) {
          score += 1;
          coinsCollected++; // Increment the coins collected counter
          theCoins[i].destroy();
          theCoins.splice(i, 1);
          document.getElementById("scoreboard").innerHTML =
            "HEALTH: " + health + " &emsp; SCORE: " + score;
          displayPortfolioInfo(coinsCollected); // Call to display portfolio info based on coin count
        }
      }
    }

    // HANDLING ENEMIES COLLISION
    for (let i = theEnemies.length - 1; i >= 0; i--) {
      if (theEnemies[i]) {
        const enemyBB = new THREE.Box3().setFromObject(theEnemies[i].model);
        if (
          planeBB.intersectsBox(enemyBB) &&
          !healthDecremented &&
          currentTime - lastDamageTime > 1000
        ) {
          if (health > 0) {
            // Only decrement health if it's above 0
            health -= 1; // Decrease health when colliding with an enemy
            healthDecremented = true; // Set the flag to true
            lastDamageTime = currentTime; // Update the time of last damage
            document.getElementById("scoreboard").innerHTML =
              "HEALTH: " + health + " &emsp; SCORE: " + score;
          }
        }
      }
    }

    // HANDLING MISSILES COLLISION
    for (let j = theMissiles.length - 1; j >= 0; j--) {
      if (theMissiles[j]) {
        const missileBB = new THREE.Box3().setFromObject(theMissiles[j].model);
        for (let i = theEnemies.length - 1; i >= 0; i--) {
          if (theEnemies[i]) {
            const enemyBB = new THREE.Box3().setFromObject(theEnemies[i].model);
            if (missileBB.intersectsBox(enemyBB)) {
              // Collision detected
              theEnemies[i].destroy(); // Destroy the enemy
              theMissiles[j].destroy(); // Destroy the missile
              theEnemies.splice(i, 1); // Remove enemy from the array
              theMissiles.splice(j, 1); // Remove missile from the array
              score += 10; // Increase score
              console.log("Missile hit enemy!"); // Debugging line
            }
          }
        }
      }
    }
  }

  // Check if health has dropped to 0
  if (health <= 0) {
    // Trigger game over logic
    document.getElementById("gameover").innerHTML = "YOU LOST";
    // Set a flag to indicate the game has ended
    gameEnded = true; // Ensure you have a gameEnded variable in your SceneManager
  }

  return [theCoins, theEnemies, theMissiles, score, health];
}

// Updated function to display portfolio information based on coins collected
function displayPortfolioInfo(coinsCollected) {
  const portfolioPopup = document.getElementById("portfolioPopup");
  const portfolioTitle = document.getElementById("portfolioTitle");
  const portfolioContent = document.getElementById("portfolioContent");

  let title = "";
  let content = "";

  if (coinsCollected === 1) {
    title = "Hello";
    content = "Good to see you here...Keep Playing, Happy Knowing";
  } else if (coinsCollected === 2) {
    title = "About : ";
    content = "I am Swati Shukla, an aspiring software developer currently pursuing my MSc in Informatics at the University of Delhi. With a strong academic background in Electronics (BSc Hons.), I possess a solid foundation in programming languages such as Python, C, HTML, and data tools like Tableau. My passion for UX design is complemented by experience in cloud technologies and big data. Through roles like Summer Fellowship Developer and freelance UX Designer, I have applied my skills to real-world projects, including developing virtual labs for remote learning. Eager to bring creativity and technical expertise to innovative software development and UX design projects.";
  } else if (coinsCollected === 3) {
    title = "Experience : ";
    content = "FRESHERS";
  } else if (coinsCollected === 4) {
    title = "Download Resume";
    content = "Congratulations! You have collected 4 coins. Click the link below to download your resume.";
    content += '<a href="SWATI resume.pdf" download style="color: yellow; text-decoration: underline;">Download Resume</a>';
  } else if (coinsCollected === 5) {
    title = "Skills";
    content = '<div><img src="https://skillicons.dev/icons?i=bootstrap,css,tensorflow,figma,gcp,git,py,androidstudio,opencv,blender,vite,github,html,js,linux,c,cpp,mysql,netlify,nextjs,nodejs,npm,react,tailwind,threejs,vscode&perline=5" alt="SwatiShukla" loading="lazy"/></div>';
  } else if (coinsCollected === 6) {
    title = "GitHub Profile";
    content = "Congratulations! You have collected 6 coins. Click the link below to visit my GitHub profile.";
    content += '<a href="https://github.com/swatishukla00" target="_blank" style="color: yellow; text-decoration: underline;">Visit GitHub Profile</a>';
  } else if (coinsCollected === 7) {
    title = "Projects";
    content = "<h3>Here are some of my projects:</h3><ul>";
    
    const projectsData = [
      {
        id: 1,
        name: "Stock App UX Design",
        description: "Created user-friendly designs for a stock trading app",
        date: "2024-02-01",
      },
      {
        id: 2,
        name: "Image Processing Web App (Django)",
        description: "Developed an image processing app with Django",
        date: "2024-04-04",
      },
      {
        id: 3,
        name: "Farmers' Website (MERN)",
        description: "Handled back-end integration for a MERN stack project.",
        date: "2024-06-06",
      },
      {
        id: 4,
        name: "Vlabs Development (HTML/CSS)",
        description: "Developed virtual labs during COVID",
        date: "2022-05-30",
      },
    ];

    projectsData.forEach(project => {
      content += `<li><strong>${project.name}</strong>: ${project.description} (Date: ${project.date})</li>`;
    });
    
    content += "</ul>"; // Close the unordered list
  }

  // Debugging output
  console.log("Title:", title);
  console.log("Content:", content);

  // Update the icons based on coins collected
  document.querySelectorAll(".icons").forEach((iconDiv, index) => {
    if (index < coinsCollected) {
      iconDiv.classList.remove("locked");
      iconDiv.classList.add("unlocked");
    } else {
      iconDiv.classList.remove("unlocked");
      iconDiv.classList.add("locked");
    }
  });

  if (title && content) {
    portfolioTitle.innerHTML = title;
    portfolioContent.innerHTML = content;
    portfolioPopup.classList.add("show");
    portfolioPopup.classList.remove("hide");
    portfolioPopup.style.display = "block";
    portfolioPopup.style.opacity = 0;

    setTimeout(() => {
      portfolioPopup.style.opacity = 1;
    }, 10);

    setTimeout(() => {
      portfolioPopup.classList.add("hide");
      setTimeout(() => {
        portfolioPopup.style.display = "none";
      }, 900); // Adjusted to match the hide transition
    }, 6000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Call the function to create the coin info container when the game starts
  createCoinInfoContainer();

  document.querySelectorAll(".icons img").forEach((img) => {
    img.addEventListener("click", (event) => {
      const coinNumber = parseInt(
        event.target.parentElement.getAttribute("data-coin")
      );
      const score = parseInt(
        document.getElementById("scoreboard").innerHTML.split("SCORE: ")[1]
      );

      // Check if the score is sufficient to display the portfolio info
      if (score >= coinNumber) {
        displayPortfolioInfo(coinNumber);
      } else {
        // Optionally, you can alert the user or provide feedback
        alert("You need to collect more coins to view this information!");
      }
    });
  });
});
