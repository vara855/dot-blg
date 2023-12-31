const darkThemeStyles = document.head.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const STORAGE_KEY = 'prefsDark';

function toggleTheme() {
    if (isDarkTheme()) {
        localStorage.setItem(STORAGE_KEY, 'false');
    } else {
        localStorage.setItem(STORAGE_KEY, 'true');
    }

    applyTheme();
}

function isDarkTheme() {
    const themeValue = localStorage.getItem('prefsDark');
    if (themeValue === 'true') {
        return true;
    }
    if (themeValue === 'false') {
        return false;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return false;
    }
    return true;
}
function applyTheme() {
    const isDark = isDarkTheme();
    // if (
    //     localStorage.prefsDark === 'true' ||
    //     (window.matchMedia &&
    //         window.matchMedia('(prefers-color-scheme: dark)').matches &&
    //         localStorage.prefsDark !== 'false')
    // ) {
    //     document.body.classList.add('dark');
    // }
    const darkStyleMedia = isDark ? 'all' : 'not all';

    if (darkThemeStyles) {
        darkThemeStyles.media = darkStyleMedia;
    }
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.getElementById('theme-toggler');
    document.body.setAttribute('style', 'transition: background-color .3s linear;');
    toggler.addEventListener('click', toggleTheme);

    applyTheme();
});
