export const categories = {
  data() {
    return {
      categories: [],
    }
  },
  created () {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    }
  },
}
export const items = {
  data() {
    return {
      items: [],
    }
  },
  created () {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`)
      this.items = res.data
    }
  },
}
export const heroes = {
  data() {
    return {
      heroes: [],
    }
  },
  created () {
    this.fetchHeroes();
  },
  methods: {
    async fetchHeroes() {
      const res = await this.$http.get(`/rest/heroes`)
      this.items = res.data
    }
  },
}
export const upload = {
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload' 
    },
    authHeaders() {
      return { Authorization: `Bearer ${localStorage.token || ''}` }
    }
  },
}