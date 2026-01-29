document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.main-header');
    const navItems = document.querySelectorAll('.nav-menu ul li'); 
    const sections = document.querySelectorAll('section');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                resetHamburger();
            }
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                resetHamburger();
            }
        });
    }

    function resetHamburger() {
        const spans = menuToggle.querySelectorAll('span');
        if (spans.length > 0) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((li) => {
            li.classList.remove("active");
            const link = li.querySelector('a');
            if (link && link.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
        
        if (window.scrollY < 200) {
            navItems.forEach(li => li.classList.remove("active"));
            navItems[0].classList.add("active");
        }
    });

    document.querySelectorAll('.nav-menu a, .hero-btns a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    navMenu.classList.remove('active');
                    resetHamburger();

                    window.scrollTo({
                        top: targetElement.offsetTop - 70, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const observerOptions = { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.about-image, .about-text, .feature-item, .animate-text, .animate-p, .hero-btns, .service-card, .section-header, .gallery-item, .feature-box, .reveal-left, .reveal-right, .gallery-card, .pyramid-card, .why-us-content, .features-list'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        observer.observe(el);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeBtn = document.querySelector('.filter-btn.active');
                if (activeBtn) activeBtn.classList.remove('active');
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, 10);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.8)";
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .animate-show {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transform: scale(1) !important;
        }
        .gallery-card {
            transition: opacity 0.4s ease, transform 0.4s ease !important;
        }
        @media (max-width: 992px) {
            .nav-menu { 
                visibility: hidden; 
                opacity: 0; 
                pointer-events: none; 
            }
            .nav-menu.active { 
                top: 70px !important; 
                opacity: 1 !important; 
                visibility: visible !important; 
                pointer-events: auto !important; 
            }
        }
    `;
    document.head.appendChild(style);
});