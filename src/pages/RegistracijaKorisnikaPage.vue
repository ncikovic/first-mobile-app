<template>
  <q-page padding>
    <h1>Registracija</h1>
    <p>Registrirajte se kako biste dobili pristup našem sistemu.</p>

    <!-- Ime -->
    <q-input
      v-model="form.name"
      label="Ime"
      :rules="[val => val && val.length > 0 || 'Ime je obavezno']"
      lazy-rules
    />

    <!-- Email -->
    <q-input
      v-model="form.email"
      label="Email"
      type="email"
      :rules="[
        val => val && val.length > 0 || 'Email je obavezan',
        val => /.+@.+\..+/.test(val) || 'Email nije u ispravnom formatu'
      ]"
      lazy-rules
    />

    <!-- Korisničko ime -->
    <q-input
      v-model="form.username"
      label="Korisničko ime"
      :rules="[val => val && val.length > 0 || 'Korisničko ime je obavezno']"
      lazy-rules
    />

    <!-- Lozinka -->
    <q-input
      v-model="form.password"
      label="Lozinka"
      type="password"
      :rules="[val => val && val.length >= 6 || 'Lozinka mora imati barem 6 znakova']"
      lazy-rules
    />

    <!-- Potvrdi -->
    <q-btn label="Potvrdi" color="primary" @click="registerUser" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    registerUser() {
      // Provjera valjanosti forme
      this.$refs.form.validate().then(success => {
        if (success) {
          // Logika za registraciju
          console.log("Registrirani podaci:", this.form);
          // Ovdje možete dodati funkcionalnost za slanje podataka na server
        } else {
          console.log("Formular nije ispravan");
        }
      });
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
