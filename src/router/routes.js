const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/o_nama",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          { path: "", component: () => import("pages/ONamaPage.vue") },
          { path: "/kontakt", component: () => import("pages/Kontakt.vue") },
          { path: "/nas_tim", component: () => import("pages/NasTim.vue") },
        ],
      },
      {
        path: "/dogadaji",
        component: () => {
          return import("pages/DogadajiPage.vue");
        },
      },
      {
        path: "/popisVeterinara",
        component: () => {
          return import("pages/PopisVeterinaraPage.vue");
        },
      },
      {
        path: "/Prijava",
        component: () => import("layouts/MainLayout.vue"),
        children: [
          {
            path: "/administrator",
            component: () => import("pages/Administrator.vue"),
          },
          {
            path: "/prijavaKorisnika",
            component: () => import("pages/PrijavaKorisnikaPage.vue"),
          },
        ],
      },
      {
        path: "/registracijaKorisnika",
        component: () => {
          return import("pages/RegistracijaKorisnikaPage.vue");
        },
      },
      {
        path: "/postavke",
        component: () => {
          return import("pages/PostavkePage.vue");
        },
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/admin/postavke",
        component: () => import("pages/PostavkePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
