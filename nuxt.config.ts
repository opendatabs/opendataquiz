// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",

    // IMPORTANT for GitHub Pages (project page under /opendataquiz/)
    app: {
        baseURL: "/opendataquiz/",
        head: {
            title: "Open Data Basel-Stadt Quiz",
            htmlAttrs: { lang: "de" },
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "apple-mobile-web-app-title",
                    content: "Open Data Quiz",
                },
                { name: "application-name", content: "Open Data Quiz" },
                // AVOID absolute root paths on Pages; remove or make relative if you really need it:
                // { name: 'msapplication-config', content: '/browserconfig.xml' },
            ],
        },
    },

    nitro: {
        // Pre-render static site suited for GitHub Pages (adds 404.html etc.)
        preset: "github_pages",
        prerender: {
            // Make sure both default and /en locale entry points exist
            routes: ["/", "/en"],
        },
    },

    routeRules: {
        // Ensure all routes are statically generated
        "/**": { prerender: true },
    },

    // ⚠️ Runtime config on a static site is baked at build time.
    // Do NOT expose secrets (GITHUB_TOKEN) in public or client code.
    runtimeConfig: {
        githubToken: process.env.GITHUB_TOKEN, // server-only (unused on Pages)
        apiUrl: process.env.API_URL, // server-only (unused on Pages)
        public: {
            logger_bs: { loglevel: process.env.LOG_LEVEL || "debug" },
        },
    },

    ui: { colorMode: false },

    modules: [
        "@nuxt/ui",
        "@nuxtjs/i18n",
        "@dcc-bs/common-ui.bs.js",
        "@dcc-bs/logger.bs.js",
        "@dcc-bs/feedback-control.bs.js", // see note below about token
    ],

    // Your feedback-control config – beware of tokens on a static site
    "feedback-control.bs.js": {
        repo: "Feedback",
        owner: "DCC-BS",
        project: "Open Data Quiz",
        githubToken: process.env.GITHUB_TOKEN, // will be baked into client if referenced on client
    },

    i18n: {
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "de", name: "Deutsch", file: "de.json" },
        ],
        defaultLocale: "de",
        strategy: "prefix_except_default", // => routes / and /en
        lazy: true,
        langDir: "locales",
    },

    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
});
