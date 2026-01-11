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

    // Scroll-based Animations and Parallax
    (function setupScrollAnimations() {
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.classList.add('fade-in-section');
            observer.observe(section);
        });

        // Parallax effect for hero section
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (header && scrolled < 500) {
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
                header.style.opacity = 1 - (scrolled / 500);
            }
        });

        // Add staggered animation to about containers
        const aboutContainers = document.querySelectorAll('.about-container');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        aboutContainers.forEach(container => aboutObserver.observe(container));

        // Add animation to education boxes
        const educationBoxes = document.querySelectorAll('.education-box');
        const eduObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        educationBoxes.forEach(box => eduObserver.observe(box));
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

            // Add hover effect for individual items
            const items = track.querySelectorAll('img');
            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'scale(1.2) rotate(5deg)';
                    item.style.filter = 'brightness(1.2)';
                    item.style.transition = 'all 0.3s ease';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'scale(1)';
                    item.style.filter = 'brightness(1)';
                });
            });

            animate();
        }

        initInfiniteCarousel('.softwares-track', '.softwares-container', 0.3);
        initInfiniteCarousel('.tools-track', '.tools-container', 0.3);
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

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-bar nav ul li a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Add scroll effect to navbar
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