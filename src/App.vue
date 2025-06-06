<script setup>
import SearchBar from './components/SearchBar.vue'
import ResultsSet from './components/ResultsSet.vue'
</script>

<template>
  <header>
    <div class="app">
      <div class="content-box">
        <h1 class="main-heading">Discover Timeless Elegance</h1>
        <SearchBar />
        <ResultsSet />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.content-box {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.05);
  width: 100%;
  box-sizing: border-box;
  min-height: 500px;
  min-width: 1000px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.main-heading {
  font-size: 2.5rem;
  text-align: center;
  margin: 2rem 0;
  color: #111;
}
</style>
