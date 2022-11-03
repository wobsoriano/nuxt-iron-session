<script setup lang="ts"></script>

<template>
  <div>
    <h1>
      <span style="margin-right: .3rem; vertical-align: middle;">
        <img src="/GitHub-Mark-32px.png" width="32" height="32" alt="">
      </span>
      <a href="https://github.com/wobsoriano/nuxt-iron-session">nuxt-iron-session</a> - Authentication example
    </h1>

    <p>
      This example creates an authentication system that uses a
      <b>signed and encrypted cookie to store session data</b>.
    </p>

    <h2>Features</h2>

    <ul>
      <li>Logged in status synchronized between browser windows/tabs</li>
      <li>Layout based on logged in status</li>
      <li>Session data is signed and encrypted in a cookie</li>
    </ul>

    <h2>Steps to test the functionality:</h2>

    <ol>
      <li>Click login and enter your GitHub username.</li>
      <li>
        Click home and click profile again, notice how your session is being
        used through a token stored in a cookie.
      </li>
      <li>
        Click logout and try to go to profile again. You&apos;ll get
        redirected to the `/login` route.
      </li>
    </ol>
  </div>
</template>

<style>
li {
  margin-bottom: 0.5rem;
}
</style>
