<script setup>
import { ref } from 'vue'
import { useSearchStore } from '../stores/search.js'
import debounce from 'lodash.debounce'

const searchStore = useSearchStore()
const searchTerm = ref('')

const triggerSearch = debounce(() => {
    if (searchTerm.value.trim()) {
        searchStore.search(searchTerm.value.trim())
    } else {
        searchStore.search('')
    }
}, 300)

function onInput() {
    triggerSearch()
}

function clearSearch() {
    searchTerm.value = ''
    searchStore.search('')
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        triggerSearch.flush()
    }
}
</script>

<template>
    <div class="search-wrapper" role="search">
        <input
            id="product-search"
            type="text"
            v-model="searchTerm"
            @input="onInput"
            @keypress="handleKeyPress"
            placeholder="Search for a product..."
            aria-label="Search for a product"
            class="search"
        />
        <button v-if="searchTerm" @click="clearSearch" class="clear-button" aria-label="Clear search">&times;</button>
    </div>
</template>

<style scoped>
.search-wrapper {
    position: relative;
    max-width: 800px;
    margin: 1rem auto;
}

.search {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 1.1rem;
    border: 1.5px solid #d1d5db;
    border-radius: 0.5rem;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

.search:focus {
    outline: none;
    border-color: #6b7280;
    box-shadow: 0 0 5px rgba(107, 114, 128, 0.5);
}

.clear-button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
}
</style>