<script setup lang="ts">
import { ref } from "vue"
import { toast } from "vue3-toastify"
import AuthService from "@/services/auth"
import { useDialog } from "@/composables"
import { useAuthStore } from "@/stores"

const props = defineProps<{
  guid: string
}>();

const authStore = useAuthStore()

const { isOpened } = useDialog(props.guid)

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
const loading = ref(false)

const authService = new AuthService();

async function auth() {
  loading.value = true;
  // TODO 
  await authService.login(email.value, password.value)
    .then(response => {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      localStorage.setItem("REFRESH_TOKEN", response.refreshToken);

      // TODO - gérer le register en back

      location.reload();
    }, (error) => {
      toast.error(error.message)
    })
    .finally(() => {
      loading.value = false;
    })
}

function handleChangeDialog(type: string) {
  authStore.dialogType = type
}
</script>

<template>
  <v-dialog v-model="isOpened"
    :width="$vuetify.display.xs ? 'unset' : '500px'">
    <v-card color="#e0e0e0" class="py-4 rounded-lg">
      <v-card-title class="text-h4 d-flex justify-center mb-8">S'identifier</v-card-title>
      <v-card-text>
        <v-form @submit.prevent v-model="valid" class="d-flex flex-column ga-4 mb-8">
          <template v-if="authStore.dialogType === 'register'">  
            <v-text-field :rules="nomRules" v-model="nom" label="Nom" required />  
            <v-text-field :rules="prenomRules" v-model="prenom" label="Prénom" required />  
          </template>  
          <v-text-field :rules="emailRules" v-model="email" label="Email" required></v-text-field>
          <v-text-field type="password" :rules="passwordRules" v-model="password" label="Mot de passe"
            required></v-text-field>
          <v-btn :loading="loading" @click="auth" :disabled="!valid" color="#bb86fc" text="Envoyer"
            class="align-self-end"></v-btn>
        </v-form>
        <p v-if="authStore.dialogType === 'register'">
          si vous possédez déjà un compte : <a href="" @click.prevent="handleChangeDialog('login')">se connecter</a>
        </p>
        <p v-else>
          si vous ne possédez pas de compte : <a href="" @click.prevent="handleChangeDialog('register')">s'inscrire</a>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<style scoped lang="scss"></style>