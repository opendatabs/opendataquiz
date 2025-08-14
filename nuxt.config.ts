// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    runtimeConfig: {
        githubToken: process.env.GITHUB_TOKEN,
        apiUrl: process.env.API_URL,
        public: {
            logger_bs: {
                loglevel: process.env.LOG_LEVEL || "debug",
            },
        },
    },
    // Define app head configuration
    app: {
        head: {
            titleTemplate: 'Open Data Quiz',
            htmlAttrs: {
                lang: 'de',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'apple-mobile-web-app-title',
                    content: 'Open Data Quiz',
                },
                { name: 'application-name', content: 'Open Data Quiz' },
                { name: 'msapplication-config', content: '/browserconfig.xml' },
            ],
        },
    },
    ui: {
        colorMode: false,
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n',
        '@dcc-bs/common-ui.bs.js',
        '@dcc-bs/logger.bs.js',
        "@dcc-bs/feedback-control.bs.js",
    ],
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    "feedback-control.bs.js": {
        repo: "Feedback",
        owner: "DCC-BS",
        project: "Open Data Quiz",
        githubToken: process.env.GITHUB_TOKEN,
    },
    // localization
    i18n: {
        locales: [
            {
                code: "en",
                name: "English",
                file: "en.json",
            },
            {
                code: "de",
                name: "Deutsch",
                file: "de.json",
            },
        ],
        defaultLocale: "de",
        strategy: "prefix_except_default",
    },
});
