<template>
  <!-- HTML in Vue.js -->

  <!-- Gestion du score utilisateur avec compteurs -->
  <section class="score">
    Player <span>{{ this.win_count }}</span> x
    <span>{{ this.lose_count }}</span> Computer
  </section>

  <!-- Récupération de la question et son affichage -->
  <template v-if="this.question">
    <h1 v-html="this.question">
    </h1>

    <!-- Boucle de récupération de chaque question + v-bind:key à ne pas omettre pour la bonne pratique ESlint -->
    <template v-for="(answer, index) in this.answers" v-bind:key="index">
      <input :disabled="this.answerSubmitted" type="radio" name="options" :value="answer" v-model="this.chosen_answer">

      <!-- Affichage en lecture HTML pour l'identification de tous les caractères -->
      <label v-html="answer"></label><br>
    </template>

    <!-- Gestion de l'envoie de réponse finale -->
    <button v-if="!this.answerSubmitted" @click="this.submitAnswer()" class="send" type="button">Send</button>

  </template>

  <!-- Analyse de la réponse choisie, envoie de la bonne réponse -->
  <section class="result" v-if="this.answerSubmitted">
    <template v-if="this.chosen_answer == this.correctAnswer">
      <h4>&#9989; Congratulations, your answer "{{this.correctAnswer}}" is correct.</h4>
    </template>
    <template v-else>
      <h4>&#10060; I'm sorry, you picked the wrong answer. The correct answer is "{{this.correctAnswer}}".</h4>
    </template>
    <!-- Ajout de la fonction qui envoie ensuite la question aléatoire suivante -->
    <button @click="this.getNewQuestion()" class="send" type="button">Next question</button>
  </section>

</template>

<script>
// JS in Vue.js
  export default {
    name: 'App',
    // Les données retournées de l'application (stock de variables)
    data() {
      return {
        chosen_answer: undefined,
        question: undefined,
        // difficulty: undefined,
        incorrectAnswers: [],
        correctAnswer: '',
        win_count: 0,
        lose_count: 0,
        answerSubmitted: false
      }
    },
    // Propriété calculée
    computed: {
      answers() {
        let answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
        //  Générer aléatoirement l'ordre de la bonne réponse
        answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswer);
        //  answers.push('test')
        return answers;
      }
    },
    methods: {
      submitAnswer() {
        // // Si rien dans la propriété chosen_answer on passe à la suite
        if (!this.chosen_answer) {
          alert('Pick one of the options');
        } else {
          this.answerSubmitted = true;
          //  Si réponse bonne ou mauvaise, ajout des points respectifs
          if (this.chosen_answer == this.correctAnswer) {
            this.win_count++;
          } else {
            this.lose_count++
          }
        }
      },
      getNewQuestion() {
        // Remettre à zéro la réponse API et les cases réponses pour la question suivante
        this.chosen_answer = undefined;
        this.answerSubmitted = false;
        this.question = undefined;

        // Configuration de notre API : https://opentdb.com/api_config.php
        this.axios
          .get('https://opentdb.com/api.php?amount=1&category=30')
          .then(response => (
            this.question = response.data.results[0].question,
            // this.difficulty = response.data.results[0].difficulty,
            this.incorrectAnswers = response.data.results[0].incorrect_answers,
            this.correctAnswer = response.data.results[0].correct_answer
          ))
      }
    },
    // Lorsque la page app est crée, envoyer :
    created() {
      this.getNewQuestion();
    }
  }
</script>

<style lang="sass">
// CSS in SASS
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin: 12rem auto
  max-width: 960px
  background-color: lightgray
  padding: 20px 10px 20px 10px

h1
  margin-top: 40px
  font-size: 28px

input[type='radio']
  margin: 12px 4px

button.send
  margin-top: 12px
  height: 40px
  min-width: 120px
  padding: 0 16px
  color: #fff
  background-color: #1867c0
  border: 1px solid #1867c0
  cursor: pointer

section.score
  border-bottom: 1px solid black
  padding: 24px
  font-size: 18px

  span
    padding: 8px
    font-weight: bold
    border: 1px solid black
</style>
