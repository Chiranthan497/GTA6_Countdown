// GTA 6 release date
const releaseDate = new Date("November 19, 2026 00:00:00");

const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const messageEl = document.getElementById('message');

function updateCountdown() {
    const now = new Date();

    // If release date reached
    if (now >= releaseDate) {
        clearInterval(timer);
        monthsEl.textContent = daysEl.textContent = hoursEl.textContent =
            minutesEl.textContent = secondsEl.textContent = "00";
        messageEl.textContent = "🎉 GTA 6 HAS LAUNCHED! 🎮";
        return;
    }

    // Calculate time left
    let totalSeconds = Math.floor((releaseDate - now) / 1000);
    const totalDays = Math.floor(totalSeconds / (3600 * 24));
    const months = Math.floor(totalDays / 30); // approx months
    const days = totalDays % 30;
    totalSeconds %= 3600 * 24;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    function animate(el, value) {
        const newValue = value.toString().padStart(2, '0');
        if (el.textContent !== newValue) {
            el.textContent = newValue;
            el.style.animation = 'flip 0.6s ease';
            setTimeout(() => (el.style.animation = ''), 600);
        }
    }

    animate(monthsEl, months);
    animate(daysEl, days);
    animate(hoursEl, hours);
    animate(minutesEl, minutes);
    animate(secondsEl, seconds);
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// --- Safe fade-in for the trailers section using IntersectionObserver ---
(function() {
    const fadeSection = document.querySelector('.fade-section');
    if (!fadeSection) return; // if not found, skip safely

    // initial state
    fadeSection.classList.remove('visible');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fadeSection.classList.add('visible');
                // observe only once
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(fadeSection);
})();

