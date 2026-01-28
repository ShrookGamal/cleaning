document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر الأساسية
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.main-header');

    // 2. تفعيل القائمة للموبايل (انميشن النزول من فوق)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // انميشن ايقونة الهامبرغر
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 3. تغيير ستايل الهيدر عند السكرول
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
    });

    // 4. التنقل السلس بين السكاشن
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                navMenu.classList.remove('active'); // غلق القائمة في الموبايل
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // لترك مساحة للهيدر
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. نظام أنميشن الظهور عند السكرول (Intersection Observer)
    const observerOptions = {
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
            }
        });
    }, observerOptions);

    // تم إضافة .filter-menu و .gallery-card هنا ليعملا مع الأنميشن
// أضيفي .feature-card-alt و .stats-box لمصفوفة الأنميشن
   const elementsToAnimate = document.querySelectorAll('.about-image, .about-text, .feature-item, .animate-text, .animate-p, .hero-btns, .service-card, .section-header, .gallery-item, .feature-box, .reveal-left, .reveal-right');
   elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        observer.observe(el);
    });

    // 6. منطق فلتر معرض الأعمال (الصور والفيديوهات)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // إزالة كلاس active من الزر القديم وإضافته للجديد
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    // إخفاء وإظهار العناصر بناءً على الفلتر
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        // إضافة تأثير ظهور خفيف عند التبديل
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, 10);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.8)";
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400); // يتوافق مع وقت الـ transition
                    }
                });
            });
        });
    }

    // إضافة كلاس الأنميشن للهيكل
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
    `;
    document.head.appendChild(style);
});