<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class="q-pa-md contact-page">
    <q-card class="contact-card">
      <q-form @submit="onSubmit" ref="form">
        <div class="q-gutter-md">
          <q-input
            v-model="form.name"
            label="Ime i Prezime"
            hint="Unesite svoje ime i prezime"
            outlined
            type="text"
            :rules="[val => !!val || 'Ime i prezime je obavezno']"
          />
          <q-input
            v-model="form.email"
            label="Email"
            hint="Unesite svoj email"
            outlined
            type="email"
            :rules="[val => !!val || 'Email je obavezan', val => /.+@.+\..+/.test(val) || 'Molimo unesite validan email']"
          />
          <q-input
            v-model="form.subject"
            label="Predmet"
            hint="Unesite predmet poruke"
            outlined
            type="text"
            :rules="[val => !!val || 'Predmet je obavezan']"
          />
          <q-input
            v-model="form.message"
            label="Poruka"
            hint="Unesite vašu poruku"
            outlined
            type="textarea"
            :rules="[val => !!val || 'Poruka je obavezna']"
          />
          <q-btn label="Pošaljite poruku" type="submit" color="primary" class="submit-button" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      isSubmitting: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.isSubmitting = true;
          axios
            .post(`${process.env.API_URL}/api/contact`, this.form)
            .then(() => {
              this.successMessage = "Vaša poruka je uspješno poslana!";
              this.errorMessage = "";
              this.resetForm();
            })
            .catch(() => {
              this.errorMessage = "Došlo je do greške prilikom slanja poruke. Pokušajte ponovno.";
              this.successMessage = "";
            })
            .finally(() => {
              this.isSubmitting = false;
            });
        }
      });
    },
    resetForm() {
      this.form = { name: "", email: "", subject: "", message: "" };
    },
  },
};
</script>

<style scoped>
.contact-page {
  display:contents;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e2ccfc;
  margin:0; /* Uklanja bijeli prostor s lijeve strane */
}

.contact-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button {
  width: 100%;
  margin-top: 10px;
}
</style>
