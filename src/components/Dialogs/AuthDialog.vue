<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  dialogOpened: boolean,
  dialogType: string
}>();

const emit = defineEmits<{
  (e: 'changeDialog', type: string): void,
  (e: 'closeDialog'): void
}>()

const nom = ref("")
const nomRules = [
  (v: string) => !!v || "Veuillez remplir le champ nom"
]
const prenom = ref("")
const prenomRules = [
  (v: string) => !!v || "Veuillez remplir le champ prénom"
]
const email = ref("")
const emailRules = [
  (v: string) => !!v || "Veuillez remplir le champ email",
  (v: string) => /.+@.+\..+/.test(v) || "L'addresse email n'est pas valide"
]
const password = ref("")
const passwordRules = [
  (v: string) => !!v || "Veillez remplir le champ mot de passe",
  (v: string) => (v && v.length >= 8) || "Votre mot de passe doit contenir au moins 8 caractères"
]
const valid = ref(false)

function auth() {
  console.log("test")
}

function handleChangeDialog(event: Event, type: string) {
  event.preventDefault();
  emit('changeDialog', type)
}
</script>

<template>
  <v-dialog v-on:click:outside="emit('closeDialog')" v-model="props.dialogOpened" :width="$vuetify.display.xs ? 'unset' : '500px'"><!-- min-width="340px" max-width="550px" -->
    <v-card color="#e0e0e0" class="py-4 rounded-lg">
      <v-card-title class="text-h4 d-flex justify-center mb-8"><span>S'identifier</span></v-card-title>
      <v-card-text>
        <v-form @submit.prevent v-model="valid" class="d-flex flex-column ga-4 mb-8">
          <v-text-field :rules="nomRules" v-model="nom" label="Nom" required v-if="props.dialogType === 'register'"></v-text-field>
          <v-text-field :rules="prenomRules" v-model="prenom" label="Prénom" required v-if="props.dialogType === 'register'"></v-text-field>
          <v-text-field :rules="emailRules" v-model="email" label="Email" required></v-text-field>
          <v-text-field type="password" :rules="passwordRules" v-model="password" label="Mot de passe"
            required></v-text-field>
          <v-btn v-on:click="auth" :disabled="!valid" color="#bb86fc" text="Envoyer" class="align-self-end"></v-btn>
        </v-form>
        <p v-if="props.dialogType === 'register'">
          si vous possédez déjà un compte : <a href="" v-on:click="handleChangeDialog($event, 'login')">se connecter</a>
        </p>
        <p v-else>
          si vous ne possédez pas de compte : <a href="" v-on:click="handleChangeDialog($event, 'register')">s'inscrire</a>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<style scoped lang="scss"></style>
