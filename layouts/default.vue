<template>
  <div class="site-shell d-flex flex-column min-vh-100">
    <header>
      <nav class="navbar navbar-expand-lg bg-white border-bottom">
        <div class="container">
          <NuxtLink class="navbar-brand fw-semibold" to="/">Vue + Contentful</NuxtLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Apri menu navigazione"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div id="mainNav" class="collapse navbar-collapse">
            <div class="navbar-nav ms-auto gap-lg-2">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              <NuxtLink class="nav-link" to="/sottopagina">Sottopagina</NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main id="main" class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>

html,
body {
    overflow-x: clip;
    font-family: "Syne", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
}

h2 {
    font-size: 60px;
}

.nav-link{
    font-size: 18px;
    color: rgb(128,139,145);
    text-transform: uppercase;
}

.navbar {
    height: 140px;
}

.homepage-hero {
    position: relative;
    left: 50%;
    width: 100vw;
    min-height: calc(100vh - var(--site-header-height, 0px));
    min-height: calc(100svh - var(--site-header-height, 0px));
    margin-left: -50vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.homepage-hero__overlay {
    display: flex;
    align-items: flex-end;
    min-height: calc(100vh - var(--site-header-height, 0px));
    min-height: calc(100svh - var(--site-header-height, 0px));
    padding: 3rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.55) 100%);
}

.homepage-hero__title {
    color: #fff;
    font-size: 70px;
    line-height: 0.95;
}

.homepage-hero__subtitle {
    margin: 0;
    color: #fff;
    font-size: clamp(1.15rem, 2vw, 1.5rem);
}

/** DESKTOP **/
@media (min-width: 600px) {
  body {
    font-size: 25px;
  }
}
</style>