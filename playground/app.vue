<script setup lang="ts"></script>

<template>
  <Head>
    <title>Nuxt Iron Session</title>
  </Head>
  <Header />
  <main>
    <div class="container">
      <NuxtPage />
    </div>
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.container {
  max-width: 65rem;
  margin: 1.5rem auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
