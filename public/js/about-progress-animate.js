// Animate progress bars and percentages on scroll into view

document.addEventListener('DOMContentLoaded', function() {
    const progressSection = document.getElementById('about-progress-section');
    const bars = [
        {
            bar: document.getElementById('progress-bar-medical'),
            percent: document.getElementById('progress-percentage-medical'),
        },
        {
            bar: document.getElementById('progress-bar-donation'),
            percent: document.getElementById('progress-percentage-donation'),
        }
    ];

    function showPercentage(percentEl, target) {
        percentEl.textContent = target + '%';
        percentEl.classList.add('visible');
    }

    function animateBar(barEl, target) {
        barEl.style.width = '0%';
        barEl.classList.remove('animated');
        let startTime = null;
        function animate(ts) {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / 1200, 1);
            const value = Math.floor(progress * target);
            barEl.style.width = value + '%';
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                barEl.style.width = target + '%';
                barEl.classList.add('animated');
            }
        }
        requestAnimationFrame(animate);
    }

    // IntersectionObserver to trigger animation
    let hasAnimated = false;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bars.forEach(({bar, percent}) => {
                    const target = parseInt(bar.getAttribute('data-percentage'));
                    // Show percentage immediately
                    showPercentage(percent, target);
                    // Animate bar after 500ms
                    setTimeout(() => {
                        animateBar(bar, target);
                    }, 500);
                });
                hasAnimated = true;
            } else if (hasAnimated) {
                // Reset so it can re-animate on re-entry
                bars.forEach(({bar, percent}) => {
                    bar.style.width = '0%';
                    bar.classList.remove('animated');
                    percent.classList.remove('visible');
                    percent.textContent = '0%';
                });
                hasAnimated = false;
            }
        });
    }, { threshold: 0.5 });

    if (progressSection) {
        observer.observe(progressSection);
    }
}); 