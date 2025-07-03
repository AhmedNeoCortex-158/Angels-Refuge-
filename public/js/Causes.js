AOS.init({
    duration: 800,
    once: true,
    offset: 100
});
document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.getElementById('search-container');
    const searchIcon = document.getElementById('search-icon');
    const searchInput = searchContainer.querySelector('.search-input');
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('expanded');
        if (searchContainer.classList.contains('expanded')) {
            searchInput.focus();
        }
    });
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('expanded');
        }
    });

    // Initialize language switcher
    const langSwitcher = new LanguageSwitcher();

    // Add dynamic effect to Contact Us button
    const contactBtnCauses = document.getElementById('contactUsBtnCauses');
    if (contactBtnCauses) {
        contactBtnCauses.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        contactBtnCauses.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        contactBtnCauses.addEventListener('mousedown', function() {
            this.classList.add('pressed');
        });
        contactBtnCauses.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
        });
    }
});