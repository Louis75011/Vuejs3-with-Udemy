var todos = [{
        text: "Learn JS",
        done: true
    },
    {
        text: "Learn Vue",
        done: false
    }
]

const todosApp = {
    data() {
        return {
            // Tableau vide stockant tous nos To-Dos
            todos: [],
            newTodo: {
                done: false
            }
        }
    },
    methods: {
        addTodo: function () {
            if (this.newTodo.text) {
                this.todos.push(this.newTodo);
                this.newTodo = {
                    done: false
                };
                // Variable local qui permet de stocker sans backend
                localStorage.setItem("todos", JSON.stringify(this.todos));
            } else {
                alert("To-do text is required");
            }
        }
    },
    // Ce code sera exécuté avant même la création des propriétés de données ; hook lifeCycleEvent
    beforeCreate() {
        // Il va s'exécuter en premier, avant toute création
        console.log(this.newTodo);
    },
    created() {
        // console.log(this.newTodo);
        this.todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : this.todos; // Si propriété il y a,  conversion en objet, alors on récupère l'objet sinon on reste sur le this.todos
    },
    // Changement des todos actualisés
    updated() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        console.log('Updated');
        // Possible de faire une fonction propre et de l'appeler où en a besoin (moins lourd)
    },
    // beforeUpdate() {
    //     // Si màj il y a sur la page, il se déclenchera
    //     console.log('Before update');
    // }
};

// Monter notre application dans cet élément HTML
Vue.createApp(todosApp).mount('#app');