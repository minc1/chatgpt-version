// Grab elements
const yesButton = document.getElementById('yesButton');
const surpriseMessage = document.getElementById('surpriseMessage');
const confettiCanvas = document.getElementById('confettiCanvas');

// Initialize Canvas for Confetti / Hearts
const ctx = confettiCanvas.getContext('2d');
let particles = [];
let animationId;
let isAnimating = false;

// Particle constructor
class Particle {
  constructor(x, y, size, color, shape) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.shape = shape;
    this.speedY = Math.random() * 2 + 2;
    this.speedX = (Math.random() - 0.5) * 3;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    // Gravity-ish
    if (this.y > confettiCanvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * confettiCanvas.width;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 'heart') {
      drawHeart(this.x, this.y, this.size);
    }
  }
}

// Heart shape function
function drawHeart(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.beginPath();
  ctx.arc(-size / 2, 0, size / 2, Math.PI / 2, 3 * Math.PI / 2);
  ctx.arc(size / 2, 0, size / 2, 3 * Math.PI / 2, Math.PI / 2);
  ctx.fill();
  ctx.restore();
}

// Generate confetti/hearts
function initParticles() {
  particles = [];
  const numberOfParticles = 100;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 8 + 5;
    const x = Math.random() * confettiCanvas.width;
    const y = Math.random() * confettiCanvas.height;
    const colors = ['#D81159', '#FF6F61', '#FFC0CB', '#FFA5B5', '#FFFFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    // Randomly pick shape
    const shape = Math.random() < 0.5 ? 'circle' : 'heart';
    particles.push(new Particle(x, y, size, color, shape));
  }
}

// Animate
function animate() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  animationId = requestAnimationFrame(animate);
}

// Handle resize
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
  resizeCanvas();
  if (isAnimating) {
    cancelAnimationFrame(animationId);
    initParticles();
    animate();
  }
});

// Show surprise message & start confetti
yesButton.addEventListener('click', () => {
  surpriseMessage.style.display = 'block';
  confettiCanvas.style.display = 'block';

  // Prepare confetti
  resizeCanvas();
  initParticles();
  if (!isAnimating) {
    animate();
    isAnimating = true;
  }
});
