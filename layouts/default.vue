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