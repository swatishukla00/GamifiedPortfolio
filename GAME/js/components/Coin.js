function Coin(scene, x, z) {
    const radius = 0.2;
    const height = 0.05; // Thickness of the coin
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32); // Coin-like geometry
    const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,  // Brighter gold color
        metalness: 0.6,   // Increase metalness for reflectivity
        roughness: 0.2    // Slight roughness for realistic reflections
    });
    this.model = new THREE.Mesh(geometry, material);
    
    // Rotate the coin so it lies flat
    this.model.rotation.x = Math.PI / 2;

    this.model.position.set(x, height / 2, z); // Slightly above the ground to appear more 3D
    this.model.castShadow = true; // Enable shadow casting for the coin
    scene.add(this.model);

    // Create a ring to revolve around the coin like Saturn's ring
    const ringGeometry = new THREE.RingGeometry(0.3, 0.6, 32); // Inner and outer radius
    const ringMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xCFE2F3, 
        side: THREE.DoubleSide, // Make both sides of the ring visible
        metalness: 0.2, 
        roughness: 0.1 
    });
    this.ring = new THREE.Mesh(ringGeometry, ringMaterial);
    
    // Position the ring slightly above the coin and rotate to lie flat
    this.ring.rotation.x = Math.PI / 2; // Horizontal around the coin
    this.ring.position.set(x, height / 2 + 0.05, z); // Position it around the coin

    scene.add(this.ring);

    this.destroy = function() {
        scene.remove(this.model);
        scene.remove(this.ring);
    }

    // Animate the ring to rotate around the coin
    this.update = function() {
        this.ring.rotation.z += 0.01; // Revolve the ring around the coin
    }
}

// Create and animate the coin with the ring
const coin = new Coin(scene, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    coin.update(); // Update the ring's rotation
    
    renderer.render(scene, camera);
}

animate();
