<script setup>
import { useSearchStore } from '../stores/search.js'

const store = useSearchStore()

function viewItem(item) {
  window.open(item.link, '_blank')
}

function formatCurrency(price) {
  const symbols = { 
        GBP: '£', 
        USD: '$', 
        EUR: '€' 
    }
  return `${symbols[price.currency] || price.currency}${price.min}`
}

function highlightQuery(text) {
    const query = store.query;
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}
</script>

<template>
    <div class="results-wrapper">
        <p v-if="store.loading" class="status">
            <span class="spinner" aria-label="Loading"></span> Loading...
        </p>
        <p v-else-if="store.error" class="status error">{{ store.error }}</p>
        <p v-else-if="store.query && !store.hasResults" class="status">No results could be found.</p>

        <transition-group name="fade" tag="div" class="results-grid" v-else>
            <div
            v-for="item in store.results"
            :key="item.id"
            class="result-item"
            >
                <img
                v-if="item.image_url"
                :src="item.image_url"
                :alt="item.title"
                class="result-image"
                />

                <h3
                class="result-title"
                v-html="highlightQuery(item.title)"
                ></h3>
                
                <p class="result-price">From {{ formatCurrency(item.price) }}</p>
                
                <button
                @click="viewItem(item)"
                class="view-button"
                aria-label="View {{ item.title }}"
                >View</button>
            </div>
        </transition-group>
    </div>
</template>

<style scoped>
.results-wrapper {
    width: 100%;
    margin: 2rem auto;
    padding: 1rem;
    box-sizing: border-box;
}

.status {
    text-align: center;
    color: #555;
    margin-bottom: 1rem;
}

.status.error {
    color: red;
}

.spinner {
    position: relative;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid #ccc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
    vertical-align: middle;
}

.spinner::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 40%;
    background: #333;
    transform-origin: bottom center;
    transform: translate(-50%, -100%) rotate(0deg);
    animation: tick 1s steps(1, end) infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes tick {
    to {
        transform: translate(-50%, -100%) rotate(360deg);
    }
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    gap: 1.5rem;
}

.fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.result-item {
    background-color: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.result-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

mark {
  background-color: #3b3b3b;
  color: inherit;
  padding: 0 2px;
  border-radius: 3px;
}

.result-image {
    width: 300px;
    height: 300px;
    object-fit: contain;
    margin-bottom: 1rem;
}

.result-title {
    color: #333;
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.result-title mark {
    background-color: #3b3b3b;
    font-weight: bold;
}

.result-price {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-weight: 600;
}

.view-button {
    background-color: rgb(11, 29, 49);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.view-button:hover {
    background-color: #333;
}
</style>