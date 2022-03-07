import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
base: process.env.BASE_URL,
  routes:[
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Usuario/Login.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Usuario/Login.vue"),
    },
    {
      path: "/solicitudesPartidas",
      name: "solicitudesPartidas",
      component: () => import("@/views/Admin/SolicitudPartidaListar.vue"),
    },
    {
      path: "/crearcurso",
      name: "crearcursos",
      component: () => import("@/views/Admin/crearcurso.vue"),
    },
    {
      path: "/solicitudesCitasGestion",
      name: "solicitudesCitasGestion",
      component: () => import("@/views/Admin/SolicitudCitasGestion.vue"), 
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
      path: "/inicioAdmin",
      name: "inicioAdmin",
      component: () => import("@/views/Admin/inicioAdmin.vue"),
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
      path: "/editarCita",
      name: "editarCita",
      component: () => import("@/views/Usuario/EditarSolicitudCita.vue"),
    },
    {
      path: "/registrar",
      name: "registrar",
      component: () => import("@/views/Usuario/Registrar.vue"),
    },
    
  ]
})
