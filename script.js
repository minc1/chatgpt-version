const yesButton = document.getElementById('yesButton');
const confettiWrapper = document.getElementById('confettiWrapper');

// When the "Yes! 🎉" button is clicked
yesButton.addEventListener('click', () => {
  // Release floating hearts
  releaseHearts(30);

  // Play a celebratory sound (optional)
  playSound();

  // Show a fun message after a slight delay
  setTimeout(() => {
    showModal();
  }, 1000);
});

/**
 * Create and animate multiple heart elements.
 * @param {number} count Number of hearts to release.
 */
function releaseHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random sizing and position
    const size = Math.floor(Math.random() * 20) + 20; // 20px to 40px
    const left = Math.random() * 100; // 0% to 100% (viewport width)
    const duration = Math.random() * 3 + 2; // 2 to 5 seconds
    const delay = Math.random() * 0.5; // 0s to 0.5s

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    // Add the heart to the page
    confettiWrapper.appendChild(heart);

    // Remove heart after animation ends
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }
}

/**
 * Optional: Play a celebratory sound when button is clicked.
 */
function playSound() {
  const audio = new Audio('sounds/celebration.mp3'); // Ensure you have this audio file in a 'sounds' folder
  audio.play();
}

/**
 * Show a custom modal instead of a default alert.
 */
function showModal() {
  // Create modal elements
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalMessage = document.createElement('p');
  modalMessage.innerHTML = "Yay! You said YES! 🥰<br>Happy Valentine’s Day, my love! 💖";

  const closeButton = document.createElement('button');
  closeButton.innerText = "Close 🌹";
  closeButton.classList.add('close-button');

  // Append elements
  modal.appendChild(modalMessage);
  modal.appendChild(closeButton);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  // Close modal on button click
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
  });

  // Optional: Close modal when clicking outside the modal content
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  });
}
