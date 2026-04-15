// Wait for DOM to load, then initialize particles
document.addEventListener('DOMContentLoaded', () => {
    // Only init if the container exists
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 30,
                    "density": { "enable": true, "value_area": 1000 }
                },
                "color": {
                    "value": ["#000000", "#e63946", "#dddddd"] // Pure Black, Red, Light Grey
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "size_min": 1, "sync": false }
                },
                "line_linked": {
                    "enable": false // No harsh techy lines, just soft floating elements
                },
                "move": {
                    "enable": true,
                    "speed": 0.6, // Very slow, ambient movement
                    "direction": "top",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" }, // Expand gently when mouse is near
                    "onclick": { "enable": false },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 200, "size": 8, "duration": 2, "opacity": 0.8, "speed": 3 }
                }
            },
            "retina_detect": true
        });
    }
});
