<template>
  <div class="site-shell">
    <header class="site-header">
      <nav class="site-nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/sottopagina">Sottopagina</NuxtLink>
      </nav>
    </header>

    <main class="site-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.site-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  color: #0f172a;
  font-family: "Avenir Next", "Helvetica Neue", sans-serif;
}

.site-header {
  border-bottom: 1px solid #cbd5e1;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
}

.site-nav {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.site-nav a {
  text-decoration: none;
  color: #334155;
  font-weight: 600;
}

.site-nav a.router-link-active {
  color: #0f172a;
}

.site-main {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}
</style>