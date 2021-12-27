// 1) Données simulées en front-end sans API ni base de données
var products = [{
        "photo": "img/big-mac.png",
        "name": "Big Mac",
        "price": 5.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/mc-chicken.png",
        "name": "Mc Chicken",
        "price": 4.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/double-cb.png",
        "name": "Double Cheese Burger",
        "price": 2.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/fries.png",
        "name": "Fries",
        "price": 2.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/nuggets.png",
        "name": "Mc Nuggets",
        "price": 3.49,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/salad.png",
        "name": "Salad",
        "price": 2.79,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/cola.png",
        "name": "Coke",
        "price": 1.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/lipton.png",
        "name": "Ice Tea",
        "price": 1.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "img/water.png",
        "name": "Water",
        "price": 1.49,
        "active": false,
        "quantity": 1
    }
];

// 2) JS en Vuejs3
const selfServiceMachine = {
    // Fonction qui va contenir les objets de l'application
    data() {
        return {
            // Retourne un objet
            products: window.products
        }
    },
    // Objet méthode pour assigner une fonction
    methods: {
        total: function(){
            var total = 0;
            this.products.forEach(function(item){
                if (item.active){
                    total+= item.price * item.quantity;
                }
            });
           return total.toFixed(2);
        }
    }
};

// Importation de Vuejs3 en CDN via notre page JS et fixé sur la div app(lication), la variable contient la machine de gestion des aliments va être "montée"/renderring
Vue.createApp(selfServiceMachine).mount('#app');
