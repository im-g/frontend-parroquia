<template>
  <div>
    <mynav></mynav>
    <myheader></myheader>
    <div class="wrapper fadeInDown general">
      <h1 style="text-align: center; font-weight: bold; margin-bottom: 40px">
        SOLICITUDES PARTIDAS
      </h1>
                  

      <div
        class="myfiltro"
        style="
          display: flex;
          justify-content: center;
          margin: 15px 0px;
          gap: 20px;
          align-items: center;
        "
      >
        
          <div style="text-align: center">
            <h3>Crear Nueva partida</h3>
          </div>
          <button
            class="btnuno"
            v-on:click="crearPartida"
          >
            Crear
          </button>
        
      </div>
<p style="text-align:center;">A Continuación  puede seleccionar el botón crear para generar una nueva solicitud de partida</p>    
      
      <h2 style="text-align: center; font-weight: bold;margin-top: 40px;">
        MIS SOLICITUDES PARTIDAS
      </h2>
      <p style="text-align:center;">Se listan todas las solicitudes de partidas generadas por el usuario en sesión  </p>    

      <div class="bucle">
        <div v-for="(item, index) in allSolicitudPartidas.edges" :key="index">
          <div v-if="item.node.usuario.id == id">
            <p>
              <button
                class="accordion-button collapsed"
                data-toggle="collapse"
                :data-target="'#' + index"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
              <p>{{ item.node.usuario.nombre+ " / "+item.node.fechaInscripcion}}</p>
                
              </button>
            </p>
            <div class="collapse" :id="index">
              <div class="card card-body">
                <p>{{ "Tipo solicitud " + item.node.tipo }}</p>
                <p>{{ "Estado " + item.node.estado }}</p>
                <p>{{ "Usuario " + item.node.usuario.nombre }}</p>
                <p>
                  {{ "Fecha inscripcion " + item.node.fechaInscripcion }}
                </p>
                <span v-if="item.node.respuesta == ''">SIN RESPUESTA</span>
                <span v-else
                  ><p>{{ "respuesta: " + item.node.respuesta }}</p></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mynav from "./mynav.vue";

import myheader from "../../components/header.vue";
export default {
  name: "partidasGeneradas",

  components: {
    mynav,
    myheader,
  },
  data() {
    return {
      allSolicitudPartidas: Object,
      id: "",
      nombre: "",
      password: "",
      selected: "",
    };
  },
  mounted() {
    if (localStorage.id) {
      this.id = localStorage.id;
    }
  },
  methods: {
    crearPartida() {
      this.$router.push({ name: "crearSolicitud" });
    },
  },
  apollo: {
    allSolicitudPartidas: {
      // Consulta
      query: require("@/graphql/Admin/listSolicitudPartida.gql"),
      // Asigna el error a la variable definida en data
      fetchPolicy: "no-cache",
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>
<style scoped>
html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}
.general{
  margin: 0 auto;
    width: 90%;
    color:rgba(0, 0, 0, 0.4);
}
.contenedor {
  padding-top: 15px;
}
.contenedor-filtro {
  width: 70%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.btnuno{
  border-radius: 10px;
  background-color: #3ea3cd;
  color: white;
  border: none;
  width: 25%;
    padding: 7px;
}
.filtro {
  display: flex;
  padding: 15px;
}
.accordion-button {
  width: 100%;
  background: lightslategrey;
  color: white;
  font-size: 1rem;
  border-radius: 10px;
  
}

.bucle {
  grid-column-start: 2;
  grid-column-end: 4;
}
/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
 /* Green */


@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}
</style>
