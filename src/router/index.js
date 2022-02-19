import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
base: process.env.BASE_URL,
  routes:[
    {
      path: "/parroquia",
      name: "parroquia",
      component: () => import("@/components/Servicios/principal.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Usuario/Login.vue"),
    },
    {
      path: "/",
      name: "inicio",
      component: () => import("@/views/Usuario/inicio.vue"),
    },
    {
      path: "/solicitudesPartidas",
      name: "solicitudesPartidas",
      component: () => import("@/views/Admin/SolicitudPartidaListar.vue"),
    },
    {
      path: "/solicitudesCitas",
      name: "solicitudesCitas",
      component: () => import("@/views/Admin/SolicitudCitas.vue"),
    },
    {
      path: "/solicitarCita",
      name: "solicitarCita",
      component: () => import("@/views/Usuario/solicitarCita.vue"),
    },
    {
      path: "/inicio",
      name: "inicio",
      component: () => import("@/views/Usuario/inicio.vue"),
    },
    {
      path: "/crearSolicitud",
      name: "crearSolicitud",
      component: () => import("@/views/Usuario/SolicitudPartidaCrear.vue"),
    },
    {
      path: "/partidasGeneradas",
      name: "partidasGeneradas",
      component: () => import("@/views/Usuario/partidasGeneradas.vue"),
    },
    {
      path: "/registrar",
      name: "registrar",
      component: () => import("@/views/Usuario/Registrar.vue"),
    },
    
  ]
})
