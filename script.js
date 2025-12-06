document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    const barFill = document.getElementById('bar-fill');
    const typedText = document.getElementById('typed-text');

    // Loading Screen
    (function runLoading() {
        const duration = 3000;
        const interval = 50;
        const step = (interval / duration) * 100;
        let progress = 0;

        if (!loadingScreen) {
            if (content) content.style.display = 'block';
            return;
        }

        if (!barFill) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    if (content) content.style.display = 'block';
                }, 600);
            }, duration);
            return;
        }

        const iv = setInterval(() => {
            progress += step;
            if (progress > 100) progress = 100;
            barFill.style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(iv);
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    if (content) content.style.display = 'block';
                }, 600);
            }
        }, interval);
    })();

    // Typewriter Effect
    (function setupTypewriter() {
        if (!typedText) return;
        const texts = [
            'Fullstack Developer',
            'Aspiring Software Engineer',
            'Creative Problem Solver',
            'Lifelong Learner'
        ];
        let currentText = 0;
        let charIndex = 0;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseAfterFull = 1400;

        function type() {
            const t = texts[currentText];
            if (charIndex < t.length) {
                typedText.textContent += t.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(deleteText, pauseAfterFull);
            }
        }

        function deleteText() {
            if (charIndex > 0) {
                typedText.textContent = typedText.textContent.slice(0, charIndex - 1);
                charIndex--;
                setTimeout(deleteText, deletingSpeed);
            } else {
                currentText = (currentText + 1) % texts.length;
                setTimeout(type, 200);
            }
        }

        setTimeout(type, 350);
    })();

    // Slide-in on Scroll
    (function setupSlideIn() {
        const slideElements = document.querySelectorAll('.slide-in-right');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.2 });

        slideElements.forEach(el => observer.observe(el));
    })();

    // Infinite Carousels
    (function setupInfiniteCarousels() {
        function initInfiniteCarousel(trackSelector, containerSelector, speed = 0.5) {
            const container = document.querySelector(containerSelector);
            const track = document.querySelector(trackSelector);
            if (!container || !track) return;

            track.style.display = 'flex';
            track.style.flexWrap = 'nowrap';
            track.style.alignItems = 'center';

            let scroll = 0;
            let paused = false;

            container.addEventListener('mouseenter', () => paused = true);
            container.addEventListener('mouseleave', () => paused = false);

            track.innerHTML += track.innerHTML;
            const trackWidth = track.scrollWidth / 2;

            function animate() {
                if (!paused) {
                    scroll += speed;
                    if (scroll >= trackWidth) scroll = 0;
                    track.style.transform = `translateX(-${scroll}px)`;
                }
                requestAnimationFrame(animate);
            }

            animate();
        }

        initInfiniteCarousel('.softwares-track', '.softwares-container', 0.5);
        initInfiniteCarousel('.tools-track', '.tools-container', 0.5);
    })();

    // Error Handling
    window.addEventListener('error', ev => {
        console.error('Runtime error captured:', ev.message, ev.filename, 'line', ev.lineno);
    });
});