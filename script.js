// Configuration
const CONFIG = {
  HEART_COUNT: 30,
  HEART_COLORS: ['#ec4899', '#db2777', '#be185d'],
  ANIMATION_DURATION: {
    MIN: 2000,
    MAX: 5000
  },
  HEART_SIZE: {
    MIN: 20,
    MAX: 40
  },
  SPARKLE_COUNT: 20
};

// DOM Elements
class ValentineCard {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.createSparkles();
  }

  initializeElements() {
    this.yesButton = document.getElementById('yesButton');
    this.confettiWrapper = document.getElementById('confettiWrapper');
    this.cardElement = document.querySelector('.valentine-card');
    this.photoContainers = document.querySelectorAll('.photo-container');
  }

  attachEventListeners() {
    this.yesButton?.addEventListener('click', () => this.handleYesClick());
    this.photoContainers.forEach(container => {
      container.addEventListener('mousemove', (e) => this.handlePhotoHover(e, container));
      container.addEventListener('mouseleave', () => this.resetPhotoPosition(container));
    });
  }

  handleYesClick() {
    this.releaseHearts();
    this.playSuccessSound();
    this.showSuccessModal();
    this.triggerHapticFeedback();
  }

  releaseHearts() {
    for (let i = 0; i < CONFIG.HEART_COUNT; i++) {
      setTimeout(() => this.createHeart(), i * 100);
    }
  }

  createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random properties
    const size = this.getRandomNumber(CONFIG.HEART_SIZE.MIN, CONFIG.HEART_SIZE.MAX);
    const color = CONFIG.HEART_COLORS[Math.floor(Math.random() * CONFIG.HEART_COLORS.length)];
    const left = this.getRandomNumber(0, 100);
    const duration = this.getRandomNumber(CONFIG.ANIMATION_DURATION.MIN, CONFIG.ANIMATION_DURATION.MAX);

    // Apply styles
    Object.assign(heart.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      backgroundColor: color,
      animationDuration: `${duration}ms`
    });

    this.confettiWrapper.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }

  createSparkles() {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.classList.add('sparkles-container');

    for (let i = 0; i < CONFIG.SPARKLE_COUNT; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      
      Object.assign(sparkle.style, {
        left: `${this.getRandomNumber(0, 100)}%`,
        top: `${this.getRandomNumber(0, 100)}%`,
        animationDelay: `${this.getRandomNumber(0, 5000)}ms`
      });

      sparklesContainer.appendChild(sparkle);
    }

    document.body.appendChild(sparklesContainer);
  }

  handlePhotoHover(e, container) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  resetPhotoPosition(container) {
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  }

  showSuccessModal() {
    const modal = new Modal({
      title: "Yay! You said YES! 🥰",
      message: "Happy Valentine's Day, my love! 💖",
      buttonText: "Close 🌹"
    });
    modal.show();
  }

  playSuccessSound() {
    const audio = new Audio();
    audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/zgAAAAABLgAAAAwAAAADBAAAAAEOAAAAAAAAABQQAAAACUAAAAAH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAw4AAAAAH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8=';
    audio.play().catch(() => {
      // Fallback for browsers that require user interaction
      console.log('Sound will play after user interaction');
    });
  }

  triggerHapticFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}

// Modal Class
class Modal {
  constructor({ title, message, buttonText }) {
    this.title = title;
    this.message = message;
    this.buttonText = buttonText;
    this.createModal();
  }

  createModal() {
    this.modalOverlay = document.createElement('div');
    this.modalOverlay.classList.add('modal-overlay');

    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal-content');

    const titleElement = document.createElement('h2');
    titleElement.textContent = this.title;
    titleElement.classList.add('modal-title');

    const messageElement = document.createElement('p');
    messageElement.textContent = this.message;
    messageElement.classList.add('modal-message');

    const closeButton = document.createElement('button');
    closeButton.textContent = this.buttonText;
    closeButton.classList.add('modal-button');
    closeButton.addEventListener('click', () => this.hide());

    this.modalContent.append(titleElement, messageElement, closeButton);
    this.modalOverlay.appendChild(this.modalContent);
  }

  show() {
    document.body.appendChild(this.modalOverlay);
    requestAnimationFrame(() => this.modalOverlay.classList.add('visible'));
  }

  hide() {
    this.modalOverlay.classList.remove('visible');
    this.modalOverlay.addEventListener('transitionend', () => {
      this.modalOverlay.remove();
    }, { once: true });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ValentineCard();
});