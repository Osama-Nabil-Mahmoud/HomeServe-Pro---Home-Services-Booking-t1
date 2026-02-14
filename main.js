// Data & Translations
const translations = {
    ar: {
        navServices: "الخدمات",
        navPricing: "الأسعار",
        navReviews: "تقييمات",
        navFAQ: "الأسئلة",
        ctaBookNow: "احجز دلوقتي",
        tagline: "مشاكل البيت؟ هنحلّها في أسرع وقت… وبسعر واضح.",
        subTagline: "HomeServe Pro بتوصّلك بفنيين محترفين ومعتمدين لصيانة بيتك بأعلى جودة وأفضل سعر.",
        trustChip4: "🛡️ ضمان 30 يوم",
        trustChip1: "فنيين معتمدين",
        trustChip3: "طوارئ 30 دقيقة",
        statsCompleted: "خدمة مكتملة",
        statsRating: "متوسط التقييم",
        statsTechs: "فني معتمد",
        statsSupport: "دعم فني",
        servicesTitle: "كل خدمات البيت في مكان واحد",
        pricingTitle: "تسعير واضح… قبل ما أي حد ييجي",
        pricingSubtitle: "بنقدم لك أسعار تنافسية من غير مفاجآت في الفاتورة.",
        currency: "ج.م",
        navWhyUs: "خدمة مضمونة",
        navFAQ: "الأسئلة الشائعة",
        footerRights: "جميع الحقوق محفوظة © HomeServe Pro 2024",
        bookingConfirm: "تأكيد الحجز عبر واتساب",
        timeSelectPlaceholder: "الموعد المفضل",
        citySelectPlaceholder: "المدينة",
        emergencyLabel: "طوارئ؟ (وصول خلال 30 دقيقة)",
        selectService: "السباكة",
        selectElectricity: "الكهرباء",
        selectAC: "التكييف",
        ctaQuote: "اطلب عرض سعر"
    },
    en: {
        navServices: "Services",
        navPricing: "Pricing",
        navReviews: "Reviews",
        navFAQ: "FAQ",
        ctaBookNow: "Book Now",
        tagline: "Home issues? We fix them fast... with clear rates.",
        subTagline: "HomeServe Pro connects you with certified pros to maintain your home with top quality.",
        trustChip4: "🛡️ 30-Day Guarantee",
        trustChip1: "Certified Pros",
        trustChip3: "30-Min Emergency",
        statsCompleted: "Completed Services",
        statsRating: "Avg. Rating",
        statsTechs: "Certified Pros",
        statsSupport: "Support",
        servicesTitle: "All Home Services in One Place",
        pricingTitle: "Clear Pricing... Before Arrival",
        pricingSubtitle: "Competitive rates with no surprises on your bill.",
        currency: "EGP",
        navWhyUs: "Guaranteed",
        navFAQ: "Common Questions",
        footerRights: "All Rights Reserved © HomeServe Pro 2024",
        bookingConfirm: "Confirm via WhatsApp",
        timeSelectPlaceholder: "Preferred Date",
        citySelectPlaceholder: "City",
        emergencyLabel: "Emergency? (30-min arrival)",
        selectService: "Plumbing",
        selectElectricity: "Electrical",
        selectAC: "Air Conditioning",
        ctaQuote: "Get a Quote"
    }
};

const servicesData = [
    { id: 'plumbing', icon: 'Droplets', titleAr: 'السباكة', titleEn: 'Plumbing', color: '#2563eb' },
    { id: 'electrical', icon: 'Zap', titleAr: 'الكهرباء', titleEn: 'Electrical', color: '#eab308' },
    { id: 'ac', icon: 'Wind', titleAr: 'التكييف', titleEn: 'AC', color: '#06b6d4' },
    { id: 'cleaning', icon: 'Trash', titleAr: 'التنظيف', titleEn: 'Cleaning', color: '#059669' },
    { id: 'carpentry', icon: 'Hammer', titleAr: 'النجارة', titleEn: 'Carpentry', color: '#b45309' },
    { id: 'painting', icon: 'Paintbrush', titleAr: 'النقاشة', titleEn: 'Painting', color: '#9333ea' },
    { id: 'appliances', icon: 'Tv', titleAr: 'الأجهزة', titleEn: 'Appliances', color: '#dc2626' },
    { id: 'pest', icon: 'Bug', titleAr: 'مكافحة الحشرات', titleEn: 'Pest Control', color: '#10b981' }
];

const faqs = [
    { qAr: 'إزاي أضمن جودة الخدمة؟', qEn: 'How to ensure quality?', aAr: 'بنقدم ضمان 30 يوم على كل الإصلاحات.', aEn: 'We offer a 30-day warranty on all repairs.' },
    { qAr: 'مدة الوصول؟', qEn: 'Arrival time?', aAr: 'متوسط 30 دقيقة للحالات الطارئة.', aEn: 'Average 30 mins for emergency cases.' }
];

// State
let currentLang = 'ar';
let currentTheme = 'light';

// Selectors
const langBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const themeBtn = document.getElementById('theme-toggle');
const header = document.getElementById('main-header');
const servicesContainer = document.getElementById('services-container');
const faqContainer = document.getElementById('faq-container');
const bookingModal = document.getElementById('booking-modal');
const closeModal = document.getElementById('close-modal');
const bookingForm = document.getElementById('booking-form');
const serviceTitleDisplay = document.getElementById('modal-service-title');

// Functions
function updateUI() {
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[currentLang][key];
    });

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    langText.textContent = currentLang === 'ar' ? 'EN' : 'عربي';

    renderServices();
    renderFAQ();
}

function renderServices() {
    servicesContainer.innerHTML = servicesData.map(s => `
        <div class="service-card" onclick="openBooking('${currentLang === 'ar' ? s.titleAr : s.titleEn}')">
            <div class="service-icon" style="background: ${s.color}">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <h3>${currentLang === 'ar' ? s.titleAr : s.titleEn}</h3>
            <p>${currentLang === 'ar' ? 'صيانة احترافية بضمان حقيقي' : 'Professional maintenance with warranty'}</p>
            <button class="btn-primary" style="width: 100%">${currentLang === 'ar' ? 'احجز' : 'Book'}</button>
        </div>
    `).join('');
}

function renderFAQ() {
    faqContainer.innerHTML = faqs.map((f, i) => `
        <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(${i})">
                ${currentLang === 'ar' ? f.qAr : f.qEn}
                <span>+</span>
            </button>
            <div class="faq-answer">
                ${currentLang === 'ar' ? f.aAr : f.aEn}
            </div>
        </div>
    `).join('');
}

window.toggleFaq = (idx) => {
    const items = document.querySelectorAll('.faq-item');
    items[idx].classList.toggle('active');
};

window.openBooking = (title) => {
    serviceTitleDisplay.textContent = title;
    bookingModal.style.display = 'flex';
};

// Event Listeners
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateUI();
});

themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

closeModal.addEventListener('click', () => bookingModal.style.display = 'none');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = serviceTitleDisplay.textContent;
    const date = document.getElementById('book-date').value;
    const city = document.getElementById('book-city').value;
    const emergency = document.getElementById('book-emergency').checked;
    const notes = document.getElementById('book-notes').value;

    const msg = `مرحباً HomeServe Pro 👋\nأريد حجز خدمة: ${service}\nالتاريخ: ${date}\nالمدينة: ${city}\nطوارئ: ${emergency ? 'نعم' : 'لا'}\nملاحظات: ${notes}`;
    window.open(`https://wa.me/201210285859?text=${encodeURIComponent(msg)}`, '_blank');
    bookingModal.style.display = 'none';
});

// Init
updateUI();