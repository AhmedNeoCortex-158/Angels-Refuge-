    // Search Icon Popup
    document.addEventListener('DOMContentLoaded', function() {
        const searchIcon = document.getElementById('search-icon');
        const searchPopup = document.getElementById('search-popup');
        const searchInputPopup = document.querySelector('.search-input-popup');
        let searchOpen = false;

        function openSearchPopup() {
            searchOpen = true;
            searchPopup.classList.add('open');
            setTimeout(() => searchInputPopup.focus(), 100);
        }

        function closeSearchPopup() {
            searchOpen = false;
            searchPopup.classList.remove('open');
            searchInputPopup.value = '';
        }

        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!searchOpen) {
                openSearchPopup();
            } else {
                closeSearchPopup();
            }
        });

        document.addEventListener('click', function(e) {
            if (searchOpen && !searchPopup.contains(e.target) && e.target !== searchIcon) {
                closeSearchPopup();
            }
        });

        searchInputPopup.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearchPopup();
            }
        });

        searchPopup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Initialize language switcher
    document.addEventListener('DOMContentLoaded', () => {
        const langSwitcher = new LanguageSwitcher();
    });