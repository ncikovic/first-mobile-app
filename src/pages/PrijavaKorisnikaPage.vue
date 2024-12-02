<template>
  <q-page padding>
    <h1>Login</h1>
    <p>Unesite svoje korisničke podatke za prijavu.</p>

    <!-- Korisničko ime -->
    <q-input
      v-model="username"
      label="Korisničko ime"
      :rules="[val => val && val.length > 0 || 'Korisničko ime je obavezno']"
      lazy-rules
    />

    <!-- Lozinka -->
    <q-input
      v-model="password"
      label="Lozinka"
      type="password"
      :rules="[val => val && val.length > 0 || 'Lozinka je obavezna']"
      lazy-rules
    />

    <!-- Potvrdi -->
    <q-btn label="Potvrdi" color="primary" @click="loginUser" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      // Provjera da li su uneseni korisničko ime i lozinka
      if (this.username && this.password) {
        // Ako su podaci ispravni, obriši polja i preusmjeri korisnika
        console.log("Podaci za prijavu:", this.username, this.password);

        // Očisti input polja
        this.username = "";
        this.password = "";

        // Preusmjeri korisnika na stranicu Popis Knjiga
        this.$router.push({ name: "PopisKnjigaPage" }); // Pretpostavka je da ruta ima naziv 'PopisKnjigaPage'
      } else {
        alert("Molimo unesite korisničko ime i lozinku.");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  color: #422c50;
  margin-bottom: 20px;
}

p {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.q-btn {
  width: 100%;
  margin-top: 20px;
}
</style>
