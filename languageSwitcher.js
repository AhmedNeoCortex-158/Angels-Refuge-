class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.init();
    }

    init() {
        this.updateLanguageButtons();
        this.updatePageDirection();
        this.translatePage();
        this.updateSocialMedia();
        this.attachEventListeners();
    }

    updateLanguageButtons() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }

    updatePageDirection() {
        document.documentElement.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', this.currentLang);
    }

    updateSocialMedia() {
        const socialIcons = document.querySelectorAll('.social-icon span[data-i18n]');
        socialIcons.forEach(span => {
            const key = span.getAttribute('data-i18n');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                span.textContent = translations[this.currentLang][key];
                // Also update the parent link's title for tooltip
                span.closest('a').setAttribute('title', translations[this.currentLang][key]);
            }
        });
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[this.currentLang][key];
                } else {
                    element.textContent = translations[this.currentLang][key];
                }
            }
        });

        // Update other sections
        this.updateNavigation();
        this.updateContactForm();
        this.updateContactInfo();
        this.updateFooter();
        this.updateSearch();
        this.updateSocialMedia(); // Make sure social media is updated
        this.updateFAQ(); // Update FAQ page content
        this.updateCauses(); // Update Causes page content
    }

    updateFAQ() {
        // Check if we're on the FAQ page by looking for FAQ-specific elements
        const faqTitle = document.querySelector('.faq-accordion-title');
        if (!faqTitle) return; // Not on the FAQ page

        // All FAQ elements should already have data-i18n attributes
        // and be handled by the main translatePage method
    }

    updateCauses() {
        // Check if we're on the Causes page by looking for causes-specific elements
        const causesTitle = document.querySelector('.causes-title h2');
        if (!causesTitle) return; // Not on the Causes page

        // All Causes elements should already have data-i18n attributes
        // and be handled by the main translatePage method
    }

    updateNavigation() {
        const navLinks = {
            'الرئيسية': 'home',
            'من نحن': 'about',
            'الأسباب': 'causes',
            'الصفحات': 'pages',
            'المدونات': 'blogs',
            'تواصل معنا': 'contactUs'
        };

        document.querySelectorAll('.nav-menu a').forEach(link => {
            const currentText = link.textContent.trim();
            const translationKey = navLinks[currentText];
            if (translationKey) {
                link.textContent = translations[this.currentLang][translationKey];
            }
        });
    }

    updateContactForm() {
        // Update form placeholders and labels
        const formInputs = {
            'الاسم الأول': 'firstName',
            'اسم العائلة': 'lastName',
            'رقم الهاتف': 'phoneNumber',
            'البريد الإلكتروني': 'emailAddress',
            'رسالة': 'message'
        };

        document.querySelectorAll('.form-control').forEach(input => {
            const currentPlaceholder = input.placeholder;
            const translationKey = formInputs[currentPlaceholder];
            if (translationKey) {
                input.placeholder = translations[this.currentLang][translationKey];
            }
        });

        // Update form title and submit button
        const formTitle = document.querySelector('.form-title');
        if (formTitle) {
            formTitle.textContent = translations[this.currentLang].sendMessage;
        }

        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = translations[this.currentLang].sendNow;
        }
    }

    updateContactInfo() {
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            const title = contactInfo.querySelector('h3');
            if (title) {
                title.textContent = translations[this.currentLang].address;
            }

            const paragraphs = contactInfo.querySelectorAll('p');
            paragraphs[0].textContent = translations[this.currentLang].serviceDesc;
            paragraphs[1].textContent = translations[this.currentLang].donationInfo;

            const locationStrong = contactInfo.querySelector('p:nth-child(4) strong');
            if (locationStrong) {
                locationStrong.textContent = translations[this.currentLang].location + ':';
            }

            const phoneStrong = contactInfo.querySelector('p:nth-child(5) strong');
            if (phoneStrong) {
                phoneStrong.textContent = translations[this.currentLang].phone + ':';
            }

            const emailStrong = contactInfo.querySelector('p:nth-child(6) strong');
            if (emailStrong) {
                emailStrong.textContent = translations[this.currentLang].email + ':';
            }
        }
    }

    updateFooter() {
        // Update footer sections
        const footerSections = {
            'Quick Link': 'quickLink',
            'Get In Touch': 'getInTouch',
            'Newsletter': 'newsletter'
        };

        document.querySelectorAll('.footer h3').forEach(heading => {
            const currentText = heading.textContent.trim();
            const translationKey = footerSections[currentText];
            if (translationKey) {
                heading.textContent = translations[this.currentLang][translationKey];
            }
        });

        // Update newsletter
        const emailInput = document.querySelector('.newsletter-input');
        if (emailInput) {
            emailInput.placeholder = translations[this.currentLang].enterEmail;
        }

        const subscribeBtn = document.querySelector('.newsletter-btn');
        if (subscribeBtn) {
            subscribeBtn.textContent = translations[this.currentLang].subscribe;
        }

        const emailSafeText = document.querySelector('.footer-newsletter p');
        if (emailSafeText) {
            emailSafeText.textContent = translations[this.currentLang].emailSafe;
        }

        // Update copyright
        const copyright = document.querySelector('.footer-bottom p');
        if (copyright) {
            copyright.textContent = translations[this.currentLang].copyright;
        }
    }

    updateSearch() {
        const searchInput = document.querySelector('.search-input-popup');
        if (searchInput) {
            searchInput.placeholder = translations[this.currentLang].searchPlaceholder;
        }

        const closeButton = document.querySelector('.search-close');
        if (closeButton) {
            closeButton.setAttribute('aria-label', translations[this.currentLang].closeSearch);
        }
    }

    attachEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = btn.getAttribute('data-lang');
                if (newLang !== this.currentLang) {
                    this.currentLang = newLang;
                    localStorage.setItem('language', newLang);
                    this.init();
                }
            });
        });
    }
}