const themes = {
    "default": {
        name: "Default",
        bg: "#ffffff",
        bgSecondary: "#f7f7f7",
        text: "#000000",
        textSecondary: "#999999",
        accent: "#0066cc",
        accentHover: "#0052a3",
        border: "#d1d1d1"
    },
    "nord": {
        name: "Nord",
        bg: "#2e3440",
        bgSecondary: "#3b4252",
        text: "#eceff4",
        textSecondary: "#d8dee9",
        accent: "#5e81ac",
        accentHover: "#81a1c1",
        border: "#4c566a",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/nord.min.css"
    },
    "dracula": {
        name: "Dracula",
        bg: "#282a36",
        bgSecondary: "#44475a",
        text: "#f8f8f2",
        textSecondary: "#6272a4",
        accent: "#bd93f9",
        accentHover: "#ff79c6",
        border: "#6272a4",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css"
    },
    "monokai": {
        name: "Monokai",
        bg: "#272822",
        bgSecondary: "#3e3d32",
        text: "#f8f8f2",
        textSecondary: "#75715e",
        accent: "#a6e22e",
        accentHover: "#f92672",
        border: "#49483e",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/monokai.min.css"
    },
    "material": {
        name: "Material",
        bg: "#263238",
        bgSecondary: "#37474f",
        text: "#eeffff",
        textSecondary: "#b0bec5",
        accent: "#89ddff",
        accentHover: "#80cbc4",
        border: "#546e7a",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/material.min.css"
    },
    "ayu-dark": {
        name: "Ayu Dark",
        bg: "#0a0e14",
        bgSecondary: "#1f2430",
        text: "#e6e1cf",
        textSecondary: "#b3b1ad",
        accent: "#ffb454",
        accentHover: "#ff8f40",
        border: "#11151c",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/ayu-dark.min.css"
    },
    "gruvbox-dark": {
        name: "Gruvbox Dark",
        bg: "#282828",
        bgSecondary: "#3c3836",
        text: "#ebdbb2",
        textSecondary: "#a89984",
        accent: "#b8bb26",
        accentHover: "#98971a",
        border: "#504945",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/gruvbox-dark.min.css"
    },
    "seti": {
        name: "Seti",
        bg: "#151718",
        bgSecondary: "#1d1f20",
        text: "#cfd2d1",
        textSecondary: "#6d8086",
        accent: "#55b5db",
        accentHover: "#55dbbe",
        border: "#0e1112",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/seti.min.css"
    },
    "panda-syntax": {
        name: "Panda Syntax",
        bg: "#292a2b",
        bgSecondary: "#31353a",
        text: "#e6e6e6",
        textSecondary: "#9595a2",
        accent: "#19f9d8",
        accentHover: "#ffb86c",
        border: "#42424c",
        cdnUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/panda-syntax.min.css"
    }
};

// Load theme CSS from CDN
function loadThemeCSS(theme) {
    const existingLink = document.querySelector(`link[href="${theme.cdnUrl}"]`);
    if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = theme.cdnUrl;
        document.head.appendChild(link);
    }
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    //transition class
    document.body.classList.add('theme-transitioning');

    //load theme css
    loadThemeCSS(theme);

    //smooth transition
    requestAnimationFrame(() => {
        const root = document.documentElement;
        const {bg, bgSecondary, text, textSecondary, accent, accentHover, border} = theme;

        //Set property
        root.style.setProperty('--bg-primary', bg);
        root.style.setProperty('--bg-secondary', bgSecondary);
        root.style.setProperty('--text-primary', text);
        root.style.setProperty('--text-secondary', textSecondary);
        root.style.setProperty('--accent', accent);
        root.style.setProperty('--accent-hover', accentHover);
        root.style.setProperty('--border', border);

        //Update theme
        editor.setOption('theme', themeName);
        assemblyView.setOption('theme', themeName);

        //Storage in local
        localStorage.setItem('preferred-theme', themeName);

        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    });
}

function initializeThemeSelector() {
    const themeSelect = document.getElementById('theme-select');

    themeSelect.innerHTML = '';

    Object.keys(themes).forEach(themeKey => {
        const option = document.createElement('option');
        option.value = themeKey;
        option.textContent = themes[themeKey].name;
        themeSelect.appendChild(option);
    });

    const savedTheme = localStorage.getItem('preferred-theme') || 'default';
    themeSelect.value = savedTheme;

    applyTheme(savedTheme);

    themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    Object.values(themes).forEach(theme => {
        loadThemeCSS(theme);
    });

    initializeThemeSelector();
});