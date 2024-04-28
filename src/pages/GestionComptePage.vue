<script setup lang="ts">
import { Rights } from '@/constants/Rights';
import { ref } from 'vue';
import ComptesService from '@/services/comptes';
import { toast } from 'vue3-toastify';

const users = ref<Array<{ username: string, rights: Rights }>>([])

const comptesService = new ComptesService();

const selectModels = ref<Rights[]>([])

const rightsDispo = [
  { value: Rights.ADMIN, title: 'Admin' },
  { value: Rights.USER, title: 'Utilisateur' },
  { value: Rights.SUPER_USER, title: 'Moderateur' }
]

const etatsSelects = ref<Array<{ loading: boolean, disabled: boolean }>>([])

comptesService.getUsers().then((data) => {
  users.value = data;
  users.value.forEach((user) => {
    selectModels.value.push(user.rights)
    etatsSelects.value.push({ loading: false, disabled: false })
  })
})

function updateRights(value: Rights, index: number) {
  etatsSelects.value.forEach((etat, i) => {
    if (i === index) {
      etat.loading = true
    } else {
      etat.disabled = true
    }
  })
  comptesService.updateRights(value, users.value[index].username).then(() => {
    toast.success('Droits mis à jour avec succès')
  }).catch(() => {
    toast.error('Erreur lors de la mise à jour des droits')
  }).finally(() => {
    etatsSelects.value = etatsSelects.value.map(() => {
      return { loading: false, disabled: false }
    })
  })
}

</script>

<template>
  <div class="d-flex flex-column ga-8 px-8 py-4">
    <h1>Gestion des comptes</h1>
    <v-table class="">
      <thead>
        <tr>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Droits
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td class="py-2"><v-select label="Select" :items="rightsDispo" variant="underlined" color="accent"
              v-model="selectModels[index]" density="comfortable" hide-details @update:model-value="updateRights($event, index)"
              :loading="etatsSelects[index].loading" :disabled="etatsSelects[index].disabled">
            </v-select>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped lang="scss"></style>
