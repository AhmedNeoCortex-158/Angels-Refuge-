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

    function animateBar(barEl, percentEl) {
        const target = parseInt(barEl.getAttribute('data-percentage'));
        barEl.style.width = '0%';
        barEl.classList.remove('animated');
        percentEl.textContent = '0%';
        percentEl.classList.remove('visible');
        let start = 0;
        let startTime = null;
        function animate(ts) {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / 1200, 1);
            const value = Math.floor(progress * target);
            barEl.style.width = value + '%';
            percentEl.textContent = value + '%';
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                barEl.style.width = target + '%';
                percentEl.textContent = target + '%';
                barEl.classList.add('animated');
                percentEl.classList.add('visible');
            }
        }
        requestAnimationFrame(animate);
    }

    // IntersectionObserver to trigger animation
    let hasAnimated = false;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bars.forEach(({bar, percent}) => animateBar(bar, percent));
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