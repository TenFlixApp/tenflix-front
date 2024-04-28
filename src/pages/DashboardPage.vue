<script setup lang="ts">
import DashboardIndicators from '@/components/DashboardIndicators/DashboardIndicators.vue';
import { optionsBars, optionsDonut } from '@/constants/Graphs';
import DashboardService from '@/services/dashboard';
import DashboardData from '@/Models/DashboardData';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import Utils from '@/Models/Utils';


const stats = ref<DashboardData | null>(null)
const indicators = ref<Array<{ titre: string, value: number }>>([])

const graph1 = ref<boolean>(false)
const graph2 = ref<boolean>(false)
const graph3 = ref<boolean>(false)

const dashboardService = new DashboardService();

const graphSeries = ref<{ [key: string]: Array<{ data: number[] }> }>({
  logins: [],
  register: [],
});

const donutSeries = ref<{ [key: string]: Array<number>}>({
  creators: [],
});

const optionGraph1 = Utils.deepCopy(optionsBars);
const optionGraph2 = Utils.deepCopy(optionsBars);
const optionGraph3 = Utils.deepCopy(optionsDonut);

dashboardService.getDashboardData().then((data) => {
  stats.value = data;
  indicators.value = [
    { titre: 'Nombre de comptes créés', value: data.userCount },
    { titre: 'Nombre de médias', value: data.mediaCount },
    { titre: 'Comptes désactivés', value: data.disabledUserCount },
    { titre: 'Nombre d\'adminstrateurs', value: data.adminUserCount },
  ];
  graphSeries.value.logins[0] = { data: data.login.map((login) => login.value) };
  optionGraph1.xaxis.categories = data.login.map((login) => login.date);
  graph1.value = true;
  graphSeries.value.register[0] = { data: data.register.map((register) => register.value) };
  optionGraph2.xaxis.categories = data.register.map((register) => register.date);
  graph2.value = true;
  donutSeries.value.creators = [data.creatorsCount, data.userCount - data.creatorsCount]
  optionGraph3.labels = ['Créateurs', 'Utilisateurs']
  graph3.value = true;
})

</script>

<template>
  <div class="d-flex flex-column ga-4 mt-4 px-4">
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" md="4" lg="2" v-for="ind in indicators">
        <DashboardIndicators :titre="ind.titre" :nombre="ind.value" />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between align-stretch">
      <v-col cols="12" md="6" lg="5">
        <div class="graphs d-flex flex-column justify-space-between rounded-lg pa-4 ga-8 h-100">
          <span class="text-h4">Nombre de connexions par jour</span>
          <apexchart height="400px" v-if="graph1" type="bar" :options="optionGraph1" :series="graphSeries.logins"></apexchart>
        </div>
      </v-col>
      <v-col cols="12" md="6" lg="7">
        <div class="graphs d-flex flex-column justify-space-between rounded-lg pa-4 ga-8 h-100">
          <span class="text-h4">Nombre de création de compte par jour</span>
          <apexchart height="400px" v-if="graph2" type="bar" :options="optionGraph2" :series="graphSeries.register"></apexchart>
        </div>
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <div class="graphs d-flex flex-column justify-space-between rounded-lg pa-4 ga-8 h-100">
          <span class="text-h4">Part de créateurs parmis tous les utilisateurs</span>
          <apexchart height="400px" v-if="graph3" :series="donutSeries.creators" :options="optionGraph3"></apexchart>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.graphs {
  background: #262626;
}
</style>
