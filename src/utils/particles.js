export function spawnParticles(container, originX, originY, customCount = 16) {
  if (!container) return;
  const emojis = ['💖', '✨', '🌸', '💫', '💕', '🌷', '⭐', '🎂'];

  for (let i = 0; i < customCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle text-lg sm:text-2xl select-none z-50';
    particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = (Math.PI * 2 * i) / customCount + (Math.random() - 0.5) * 0.5;
    const distance = Math.floor(Math.random() * 95) + 45;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 25;

    particle.style.left = originX + 'px';
    particle.style.top = originY + 'px';
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.animationDuration = (0.9 + Math.random() * 0.6) + 's';

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1600);
  }
}

export function createConfettiBurst(originX, originY) {
  const colors = ['#ff7b72', '#ffd167', '#84d5c7', '#a63934', '#edc157', '#ff6384'];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    const size = Math.floor(Math.random() * 8) + 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * (Math.random() > 0.5 ? 1 : 1.6)}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = 'fixed';
    confetti.style.left = `${originX}px`;
    confetti.style.top = `${originY}px`;
    confetti.style.borderRadius = '3px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '999';
    confetti.style.transition = 'all 1.3s cubic-bezier(0.25, 1, 0.5, 1)';
    document.body.appendChild(confetti);

    const destX = (Math.random() - 0.5) * 420;
    const destY = -Math.random() * 220 + (Math.random() * 140);
    const rotate = Math.random() * 720;

    requestAnimationFrame(() => {
      confetti.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotate}deg)`;
      confetti.style.opacity = '0';
    });

    setTimeout(() => {
      if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
    }, 1400);
  }
}
