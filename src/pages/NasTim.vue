<template>
  <q-page class="nas-tim">
    <!-- Naslov stranice -->
    <div class="naslov">
      <h1>Naš Tim</h1>
      <p>
        Ideja aplikacije <strong>Pets&Care</strong> nastala je iz ljubavi prema životinjama.
        Cilj nam je povezati vlasnike ljubimaca s veterinarima, groomerima i pet-sitterima,
        kako bi svaki ljubimac dobio najbolju moguću njegu.
      </p>
    </div>

    <!-- Sekcija sa članovima tima -->
    <div class="tim-container">
      <div class="clan-tima" v-for="clan in clanoviTima" :key="clan.ime">
        <img :src="clan.slika" :alt="clan.ime" class="tim-slika" />
        <h3>{{ clan.ime }}</h3>
        <p class="uloga">{{ clan.uloga }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// Definicija članova tima
const clanoviTima = ref([
  {
    ime: "Natalia Ćiković",
    uloga: "Glavni programer",
    slika: "~assets/BZIQ2522.JPG", // Putanja do slike
  },
  {
    ime: "Katja Blažević",
    uloga: "UX/UI Dizajner",
    slika: "/slike/karla.jpg",
  },
  {
    ime: "David Gušćić ",
    uloga: "Backend Developer",
    slika: "/slike/luka.jpg",
  },
]);
</script>

<style scoped>
/* Glavni stil stranice */
.nas-tim {
  text-align:justify;
  padding: 40px 20px;
}

/* Stil za naslov */
.naslov h1 {
  font-size: 2.5em;
  color: #000000;
  margin-bottom: 10px;
}

.naslov p {
  font-size: 1.2em;
  color: #262626;
  max-width: 700px;
  margin: 0 auto 40px;
}

/* Sekcija tima */
.tim-container {
  display: flex;
  flex-wrap: wrap;
  justify-content:first baseline;
  gap: 30px;
}

/* Stil za svakog člana tima */
.clan-tima {
  background: #dbf5fe;
  border-radius: 10px;
  padding: 20px;
  width: 280px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.clan-tima:hover {
  transform: scale(1.10);
}

/* Stil za slike */
.tim-slika {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
}

/* Stil za ime i ulogu */
h3 {
  margin: 15px 0 5px;
  font-size: 1.5em;
  color: #000000;
}

.uloga {
  font-size: 1.1em;
  color: #242424;
}
</style>
