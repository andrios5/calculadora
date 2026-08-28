(function () {
    const COOKIE_NAME = 'cx-theme';
    const VALID_THEMES = ['light', 'dark'];

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }

        return null;
    }

    function setCookie(value) {
        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=31536000; path=/; SameSite=Lax`;
    }

    function currentTheme() {
        return document.documentElement.dataset.theme || 'light';
    }

    function initTheme() {
        const stored = getCookie(COOKIE_NAME);
        const validStored = VALID_THEMES.includes(stored) ? stored : null;
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

        document.documentElement.dataset.theme = validStored || preferred;
    }

    function syncThemeButton(button) {
        if (!button) return;

        const icon = button.querySelector('.material-symbols-outlined');
        const isDark = currentTheme() === 'dark';

        if (icon) {
            icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        }

        button.setAttribute(
            'aria-label',
            isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
        );
    }

    function syncAllThemeButtons() {
        document.querySelectorAll('#theme-toggle').forEach(syncThemeButton);
    }

    function bindThemeToggle(selector = '#theme-toggle') {
        const button = document.querySelector(selector);

        if (!button) return;

        syncThemeButton(button);

        button.addEventListener('click', () => {
            const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';

            document.documentElement.dataset.theme = nextTheme;
            setCookie(nextTheme);

            syncThemeButton(button);
        });
    }

    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if (!mediaQuery.addEventListener) return;

        mediaQuery.addEventListener('change', (event) => {
            const stored = getCookie(COOKIE_NAME);

            if (!stored) {
                document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
                syncAllThemeButtons();
            }
        });
    }

    window.AppTheme = {
        COOKIE_NAME,
        getCookie,
        setCookie,
        currentTheme,
        initTheme,
        bindThemeToggle
    };

    initTheme();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            bindThemeToggle();
            watchSystemTheme();
        });
    } else {
        bindThemeToggle();
        watchSystemTheme();
    }
})();
