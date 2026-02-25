// Services Data
const services = [
    { icon: "fas fa-tooth", title: "تنظيف الأسنان", desc: "تنظيف احترافي عميق لإزالة الجير والبقع" },
    { icon: "fas fa-star", title: "تبييض الأسنان", desc: "تبييض متقدم للحصول على ابتسامة مشرقة" },
    { icon: "fas fa-smile", title: "تقويم الأسنان", desc: "تقويم شفاف وتقليدي لتحسين شكل الأسنان" },
    { icon: "fas fa-shield-alt", title: "حشو الأسنان", desc: "حشوات عالية الجودة بأحدث المواد" },
    { icon: "fas fa-plus-circle", title: "زراعة الأسنان", desc: "زراعة فورية بأعلى معايير الجودة" },
    { icon: "fas fa-child", title: "طب أسنان الأطفال", desc: "رعاية متخصصة لأسنان أطفالك" }
];

const testimonials = [
    { text: "دكتور ممتاز وعيادة نظيفة جداً، حسيت براحة تامة طول فترة العلاج", name: "سارة محمد", role: "مريضة منذ 3 سنوات", img: "https://randomuser.me/api/portraits/women/1.jpg" },
    { text: "أفضل تجربة تبييض أسنان، النتيجة فاقت توقعاتي بكتير", name: "أحمد علي", role: "مريض منذ سنة", img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { text: "الدكتور صبور جداً مع أطفالي وبيتعامل معاهم بطريقة رائعة", name: "منى حسن", role: "مريضة منذ 2 سنوات", img: "https://randomuser.me/api/portraits/women/2.jpg" }
];

document.getElementById('services-grid').innerHTML = services.map(s => `
    <div class="service-card reveal">
        <i class="${s.icon}"></i>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
    </div>
`).join('');

document.getElementById('testimonials-grid').innerHTML = testimonials.map(t => `
    <div class="testimonial-card reveal">
        <div class="stars">★★★★★</div>
        <p>"${t.text}"</p>
        <div class="patient-info">
            <img src="${t.img}" alt="${t.name}">
            <div>
                <h4>${t.name}</h4>
                <span>${t.role}</span>
            </div>
        </div>
    </div>
`).join('');

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar Scroll
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').style.boxShadow =
        window.scrollY > 50 ? '0 5px 30px rgba(0,0,0,0.15)' : '0 2px 20px rgba(0,0,0,0.1)';
});

// Hamburger
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
});

// Form Submit
document.querySelector('.appointment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('تم تأكيد حجز موعدك! سنتواصل معك قريباً ✅');
    e.target.reset();
});

// Lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('lightbox-img').src = item.querySelector('img').src;
        document.getElementById('lightbox').classList.add('open');
    });
});

document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('open');
});

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// Counter Animation
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 20);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = '+' + target.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// Scroll to Top
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark Mode
const darkBtn = document.createElement('button');
darkBtn.className = 'dark-mode-btn';
darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkBtn);

darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkBtn.innerHTML = document.body.classList.contains('dark')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});
