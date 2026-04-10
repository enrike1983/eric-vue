export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { 
    enabled: false,
    logs: { silent: true }
  },
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],
  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots", "nuxt-gtag"],
  gtag: {
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID
  },
  runtimeConfig: {
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulAccessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    contentfulContentType: process.env.CONTENTFUL_CONTENT_TYPE || "pageContent",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
      umamiWebsiteId: process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID || "f51261f7-a3fd-4c00-843d-704edacb83dd"
    }
  },
  app: {
    head: {
      titleTemplate: "%s",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Sito Vue con Nuxt, routing semplice e contenuti serviti da Contentful"
        }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap" },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          defer: true
        },
        {
          src: 'https://cloud.umami.is/script.js','data-website-id': process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID,
          defer: true,
        }
      ],      
      htmlAttrs: {
        lang: "it"
      }
    }
  },
  sitemap: {
    urls: ["/", "/contacts", "/gigs", "/order-of-minerva"]
  },
  robots: {
    groups: [{
      userAgent: "*",
      allow: ["/"]
    }]
  }
});