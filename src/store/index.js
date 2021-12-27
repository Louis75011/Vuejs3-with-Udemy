import { createStore } from 'vuex'
import axios from 'axios'

// Centralisation des données de notre application en un seul fichier créé par défault avec Vuex (gestionnaire d'états)
export default createStore({
  // Propriétés d'état, ces données peuvent être transmises à chaque composant donc
  state: {
    products: [],
    productsInBag: []
  },
  // Mutation d'ajout des produits en page d'acceuil et dans le panier
  mutations: {
    loadProducts (state, products) {
      state.products = products;
    },
    loadBag (state, products) {
      state.productsInBag = products;
    },
    // Passer le state et les données "product", ajout vers le panier
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
  },
  // Action requête sur l'API et gestion multiple du panier
  actions: {
    // Fake Store API
    loadProducts({ commit }) {
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data);
      })
    },
    // Chargement du panier
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")));
      }
    },
    // Action de commit de la mutation du produit
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    // Récupère le produit par l'ID pour le supprimer du panier
    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from bag?')) {
        commit('removeFromBag', productId);
      }
    },
  },
  modules: {
  }
})
