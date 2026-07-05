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

    // Scroll-based fade-in
    (function setupScrollAnimations() {
        const sections = document.querySelectorAll('.section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        sections.forEach(section => {
            section.classList.add('fade-in-section');
            observer.observe(section);
        });
    })();

    // Mobile Menu Toggle
    (function setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navBar = document.querySelector('.nav-bar');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-bar nav ul li a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        });
    })();

    // Error Handling
    window.addEventListener('error', ev => {
        console.error('Runtime error captured:', ev.message, ev.filename, 'line', ev.lineno);
    });
});
