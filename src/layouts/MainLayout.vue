<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-center-h1 custom-title">
          Pets&Care
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <!-- Dinamičke stranice -->
        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          @click="navigateTo(link.link)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- O nama (dropdown podstranice) -->
        <q-expansion-item
          icon="pets"
          label="O nama"
          caption="Saznaj više o Pets&Care zajednici!"
        >
          <q-item clickable @click="navigateTo('/o_nama')">
            <q-item-section>
              <q-item-label>O NAMA</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="navigateTo('/kontakt')">
            <q-item-section>
              <q-item-label>KONTAKT</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="navigateTo('/nas_tim')">
            <q-item-section>
              <q-item-label>NAŠ TIM</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Početna stranica",
    caption: "Početna",
    icon: "home",
    link: "/",
  },
  {
    title: "Događaji",
    caption: "Pretraži nadolazeće događaje.",
    icon: "event",
    link: "/dogadaji",
  },
  {
    title: "Popis veterinara",
    caption: "Tražiš li veterinara?",
    icon: "search",
    link: "/popisVeterinara",
  },
  {
    title: "Prijava",
    caption: "Prijavi se u svoj račun",
    icon: "login",
    link: "/prijavaKorisnika",
  },
  {
    title: "Registracija korisnika",
    caption: "Nemaš račun? Registriraj se!",
    icon: "app_registration",
    link: "/registracijaKorisnika",
  },
  {
    title: "Postavke",
    caption: "Postavke aplikacije",
    icon: "settings",
    link: "/postavke",
  },
];

const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(route) {
  router.push(route);
}
</script>

<style scoped>
/* Glavni stil za naslov */
.custom-title {
  font-weight: bold;
  font-size: 2.5em;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 2px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Zaglavlje */
.custom-header {
  background: linear-gradient(135deg, #7e38e0, #8be8ff);
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Gumb za otvaranje izbornika */
.q-btn {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;
}

.q-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* Navigacijski drawer */
.q-drawer {
  background: #1e1e2f;
  color: #ffffff;
}

.q-list {
  padding: 10px;
}

/* Stavke u meniju */
.q-item {
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
}

.q-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

/* Ikone u navigaciji */
.q-item-section avatar {
  color: #f5f5f5;
}

/* Aktivni link */
.q-item--active {
  background: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #ff9800;
}

/* Sadržaj stranice */
.q-page-container {
  background: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
}

/* Tekst za dobrodošlicu */
.q-toolbar div {
  font-size: 1.2em;
  font-weight: bold;
  margin-left: auto;
  color: #ffffff;
}
</style>
