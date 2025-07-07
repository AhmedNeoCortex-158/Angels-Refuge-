document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 900,
        once: true
    });

    // Add confetti effect
    function launchConfetti() {
        const colors = ['#00C9A7', '#92FE9D', '#FFD700', '#219a8a'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
            confetti.style.opacity = 0.7 + Math.random() * 0.3;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // Launch confetti after a small delay
    setTimeout(launchConfetti, 400);

    // Add confetti styles
    const style = document.createElement('style');
    style.innerHTML = `
        .confetti {
            position: fixed;
            top: -20px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
            animation: confetti-fall linear forwards;
        }
        @keyframes confetti-fall {
            to {
                transform: translateY(110vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
});