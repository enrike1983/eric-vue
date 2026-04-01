export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots"],
  runtimeConfig: {
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulAccessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    contentfulContentType: process.env.CONTENTFUL_CONTENT_TYPE || "pageContent",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }
  },
  app: {
    head: {
      titleTemplate: "%s | Vue + Contentful",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Sito Vue con Nuxt, routing semplice e contenuti serviti da Contentful"
        }
      ],
      htmlAttrs: {
        lang: "it"
      }
    }
  },
  sitemap: {
    urls: ["/", "/sottopagina"]
  },
  robots: {
    groups: [{
      userAgent: "*",
      allow: ["/"]
    }]
  }
});
