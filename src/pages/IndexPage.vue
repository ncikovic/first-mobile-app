<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- Zadržavamo postojeći logo -->
      <img
        alt="Pets&Care"
        src="~assets/Pets&Care.svg"
        class="logo"
      />

      <!-- Dodajemo naslov i opis -->
      <h1 class="page-title">Welcome to Pets&Care</h1>
      <p class="page-description">
        Your one-stop solution for pet care. Explore services, find tips, and
        join our community of pet lovers!
      </p>

      <!-- Dodajemo gumbe za akcije -->
      <div class="actions">
        <q-btn
          label="SAZNAJ VIŠE O NAMA"
          color="primary"
          @click="navigateTo('o_nama')"
        />
        <q-btn
          label="PRIKLJUČI SE NAŠOJ ZAJEDNICI"
          color="secondary"
          outline
          @click="navigateTo('registracijaKorisnika')"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

defineOptions({
  name: "IndexPage",
});

const router = useRouter();

// Navigacija prema stranicama
function navigateTo(routeName) {
  router.push(`/${routeName}`);
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  width: 100%;
}

.logo {
  width: 80%; /* Smanjujemo logo na mobilnim uređajima */
  max-width: 400px; /* Maksimalna širina loga */
  height: auto;
}

.page-title {
  font-size: 2.5rem;
  margin-top: 20px;
  color: #7e23f5; /* Primarna boja za naslov */
}

.page-description {
  font-size: 1.4rem;
  color: #5118a6; /* Suptilna siva za opis */
  margin: 10px 0 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column; /* Promjena u kolonu na manjim ekranima */
  justify-content: center;
  gap: 15px;
}

.q-btn {
  min-width: 200px;
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2rem; /* Smanjenje veličine naslova na manjim ekranima */
  }

  .page-description {
    font-size: 1.2rem; /* Smanjenje veličine opisa */
  }

  .actions {
    flex-direction: column; /* Raspored gumba u koloni */
    gap: 10px;
  }

  .q-btn {
    min-width: 180px; /* Manje dugme na manjim ekranima */
  }
}

@media (max-width: 400px) {
  .page-title {
    font-size: 1.8rem; /* Još manje na najmanjim ekranima */
  }

  .page-description {
    font-size: 1rem; /* Smanjenje fonta opisa */
  }
}
</style>
