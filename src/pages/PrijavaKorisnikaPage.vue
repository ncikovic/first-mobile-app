<template>
  <q-page class="q-pa-md flex justify-center items-center">
    <div class="form-container">
      <h1 class="text-center">Prijava</h1>
      <p class="text-center">Unesite svoje korisničke podatke za prijavu.</p>

      <!-- Korisničko ime ili Email -->
      <q-input
        v-model="usernameOrEmail"
        label="Korisničko ime ili Email"
        :rules="[val => val && val.length > 0 || 'Korisničko ime ili email je obavezno']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Lozinka -->
      <q-input
        v-model="password"
        label="Lozinka"
        type="password"
        :rules="[val => val && val.length > 0 || 'Lozinka je obavezna']"
        lazy-rules
        class="q-mb-md"
      />

      <!-- Potvrdi -->
      <q-btn label="Potvrdi" color="primary" @click="loginUser" class="full-width-btn" />

      <!-- Poruka o uspjehu -->
      <div v-if="loginSuccess" class="text-center text-green-500 mt-4">
        Prijava uspješna!
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usernameOrEmail: "",
      password: "",
      loginSuccess: false, // Za prikazivanje poruke o uspjehu
    };
  },
  methods: {
    async loginUser() {
      if (this.usernameOrEmail && this.password) {  // Provjerava da su oba unesena
        const loginData = {
          usernameOrEmail: this.usernameOrEmail,
          password: this.password,
        };

        try {
          const response = await axios.post("http://localhost:3000/api/login", loginData);
          console.log("Prijava uspješna:", response.data);

          // Spremanje korisničkih podataka
          localStorage.setItem("users", JSON.stringify(response.data.user));

          // Postavi loginSuccess na true kako bi prikazao poruku
          this.loginSuccess = true;

          // Resetiraj korisničko ime i lozinku
          this.usernameOrEmail = "";
          this.password = "";
        } catch (error) {
          console.error("Greška pri prijavi:", error);
          alert(error.response ? error.response.data : "Došlo je do greške");
        }
      } else {
        alert("Molimo unesite korisničko ime/email i lozinku.");
      }
    },
  },
};
</script>

<style scoped>
/* Kontejner za formu centriran na ekranu */
.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

/* Naslov */
h1 {
  font-size: 2.5rem;
  color: #422c50;
  margin-bottom: 15px;
  font-weight: bold;
}

/* Podnaslov */
p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
}

/* Stil za gumb */
.q-btn {
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 12px 0;
}

/* Poboljšanje za hover efekt na gumbu */
.q-btn:hover {
  background-color: #6619d2;
  transform: scale(1.05);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* Razmak između inputa */
.q-input {
  width: 100%;
}

/* Dodatni razmak između svakog inputa */
.q-mb-md {
  margin-bottom: 20px;
}
</style>
