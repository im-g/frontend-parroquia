<template>
  <div>
    <mynav></mynav>
    <myheader></myheader>
    <div class="wrapper fadeInDown">
      <div class="contenedor-filtro">
        
        <h1
          class="mb-3"
          style="color: #2b7797; font-family: 'Oswald', sans-serif"
        >
          Partidas Generadas
        </h1>

        <div class="bucle">
          <div v-for="(item, index) in allSolicitudPartidas.edges" :key="index">
            <div v-if="item.node.usuario.id == id">
              <p>
                <button
                  class="btn btn-primary btn-lg btn-block"
                  data-toggle="collapse"
                  :data-target="'#' + index"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  {{ item.node.tipo }}
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
                  <span v-if="item.node.respuesta== ''">SIN RESPUESTA</span>
                  <span v-else><p>{{ "respuesta: " + item.node.respuesta }}</p></span>
                  
                </div>
              </div>
            </div>
          </div>

          <button
            class="button1 btn-block btn btn-primary"
            v-on:click="crearPartida"
          >
            Crear Nueva partida
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mynav from './mynav.vue'

import myheader from '../../components/header.vue'
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
.filtro {
  display: flex;
  padding: 15px;
}
.bucle {
  border: none;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
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
.button1 {
  background-color: #33FF99;
  border: none;
  color: black;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
} /* Green */
button {
  background-color: #39ace7;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
}

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
