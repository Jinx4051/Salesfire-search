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

function handleSuggestion(term) {
    searchTerm.value = term
    searchStore.search(term)
}
</script>

<template>
    <div class="search-container" role="search">
        <div class="search-wrapper">
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

            <button
                v-if="searchTerm"
                @click="clearSearch"
                class="clear-button"
                aria-label="Clear search"
                >
                &times;
            </button>
        </div>

        <div class="suggestions">
            <p class="suggestions-label">Try a popular brand:</p>
            <div class="suggestions-list">
                <span
                    v-for="term in ['Omega', 'Rado', 'Tag Heuer', 'Rolex']"
                    :key="term"
                    @click="handleSuggestion(term)"
                    class="suggestion"
                    >
                    {{ term }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.search-wrapper {
    position: relative;
}

.search {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    border: 1.5px solid #d1d5db;
    border-radius: 0.5rem;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

.search:focus {
    outline: none;
    border-color: #6b7280;
    box-shadow: 0 0 5px rgba(107, 114, 128, 0.4);
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

.suggestions {
    margin-top: 1rem;
}

.suggestions-label {
    font-size: 0.95rem;
    color: #4e4e4e;
    margin-bottom: 0.5rem;
}

.suggestions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.suggestion {
    display: inline-block;
    background-color: #f3f4f6;
    color: #333;
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s ease, transform 0.2s ease;
    border: 1px solid transparent;
}

.suggestion:hover {
    background-color: #e5e7eb;
    transform: translateY(-1px);
    border-color: #d1d5db;
}

</style>