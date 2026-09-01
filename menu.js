(function () {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu-lateral');
    const overlay = document.getElementById('menu-overlay');

    if (!toggle || !menu) return;

    function isOpen() {
        return document.body.classList.contains('menu-open');
    }

    function getFocusableElements() {
        return Array.from(
            document.querySelectorAll(
                '.menu-toggle, #theme-toggle, .side-menu a[href], .side-menu button:not([disabled])'
            )
        );
    }

    function openMenu() {
        if (isOpen()) return;

        document.body.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
        menu.removeAttribute('inert');
        menu.setAttribute('aria-hidden', 'false');

        const firstLink = menu.querySelector('.side-menu-link');
        if (firstLink) {
            firstLink.focus({ preventScroll: true });
        } else {
            toggle.focus({ preventScroll: true });
        }
    }

    function closeMenu() {
        if (!isOpen()) return;

        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('inert', '');
        menu.setAttribute('aria-hidden', 'true');

        toggle.focus({ preventScroll: true });
    }

    function markActiveLink() {
        const current = (location.pathname.split('/').pop() || 'index.htm').toLowerCase();

        menu.querySelectorAll('.side-menu-link[href]').forEach(function (link) {
            const href = link.getAttribute('href').toLowerCase().split('?')[0].split('#')[0];

            if (href === current) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            }
        });
    }

    toggle.addEventListener('click', function () {
        if (isOpen()) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    menu.querySelectorAll('.side-menu-link').forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    document.addEventListener('keydown', function (event) {
        if (!isOpen()) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeMenu();
            return;
        }

        if (event.key !== 'Tab') return;

        const focusables = getFocusableElements().filter(function (el) {
            return el.offsetParent !== null || el === document.activeElement;
        });

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || !focusables.includes(active))) {
            event.preventDefault();
            last.focus({ preventScroll: true });
        } else if (!event.shiftKey && (active === last || !focusables.includes(active))) {
            event.preventDefault();
            first.focus({ preventScroll: true });
        }
    });

    markActiveLink();
})();
