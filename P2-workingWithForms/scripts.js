var members = [{
        fname: 'John',
        lname: 'Lennon',
        instrument: 'Acoustic Guitar'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Electric Guitar'
    },
    {
        fname: 'Paul',
        lname: 'McCarthney',
        instrument: 'Bass'
    }
]

const handlingForms = {

    // Avoir Vue dans le DevTools via GG Chrome permet d'avoir un log systématique de ce que l'on fait
    data() {
        return {
            members: window.members,
            newMember: {
                // fname: null,
                // lname: null,
                // instrument: null
            } // Le tableau vide suffit
        }
    },
    methods: {
        addMember: function () {
            // Si tous les champs sont remplies on peut envoyer les informations
            if (this.newMember.fname && this.newMember.lname && this.newMember.instrument) {
                // Ajout du nouveau membre dans le tableau existant des membres
                this.members.push(this.newMember);
                this.newMember = {};
            } else {
                alert("All fields must be filled !");
            } // Envoie ce message de blocage en cas d'erreur

        }
    }
};

Vue.createApp(handlingForms).mount('#app');