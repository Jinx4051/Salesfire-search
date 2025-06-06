import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search',{
    state: () => ({
        query: '',
        results: [],
        loading: false,
        error: null,
        currentRequestToken: null,
    }),

    actions: {
        async search(query) {
            this.query = query

            if (!query.trim()) {
                this.results = []
                this.loading = false
                this.error = null
                return
            }

            const requestToken = Date.now()
            this.currentRequestToken = requestToken
            this.loading = true
            this.error = null

            try {
                const response = await fetch(
                    `https://aix.salesfire.co.uk/api/searcha?client_id=dbf1dbc9-a940-48c2-b44b-0bb6dc63924e&query=${encodeURIComponent(query)}&limit=6&page=1`
                )

                const data = await response.json()

                if (this.currentRequestToken === requestToken) {
                    this.results = data.products || []
                } 
            } catch (err) {
                this.error = 'Failed to fetch results'
                console.error(err)
            } finally {
                if (this.currentRequestToken === requestToken) {
                    this.loading = false
                }
            }
        }
    },
    getters: {
        hasResults: (state) => state.results.length > 0,
    },
})