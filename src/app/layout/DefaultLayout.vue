<script setup lang="ts"></script>
<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl font-bold">Market AI</h1>
      <nav>
        <router-link to="/" class="text-white hover:text-gray-300">Home</router-link>
        <router-link to="/auth" class="text-white hover:text-gray-300">Auth</router-link>
      </nav>
    </header>
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white p-4">
      <p>Copyright 2026 Market AI</p>
    </footer>
  </div>
</template>
