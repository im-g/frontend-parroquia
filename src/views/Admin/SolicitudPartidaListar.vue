<template>
  <!--gestión de sol. de partidas-->
  <div>
    <nav-admin></nav-admin>
    <myheader></myheader>
    <div class="wrapper fadeInDown general">
      <h1
        style="
          text-align: center;
          font-weight: bold;
          margin-bottom: 40px;
          color: rgba(0, 0, 0, 0.4);
        "
      >
        GESTION SOLICITUDES PARTIDAS
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
          <h3>seleccionar tipo partida</h3>
        </div>
        <select
          v-on:change="filtrar($event)"
          class="form-select"
          aria-label="  "
        >
          <option selected disabled>Partidas</option>
          <option>BAUTISMO</option>
          <option>COMUNION</option>
          <option>CONFIRMACION</option>
          <option>MATRIMONIO</option>
          <option>DEFUNCION</option>
          <option>TODOS</option>
        </select>
      </div>
      <p style="text-align: center">
        Se van a listar todas las solicitudes de las partidas y se pueden
        filtrar según el tipo de partida
      </p>
      <div class="bucle">
        <div v-for="(item, index) in allSolicitudPartidas.edges" :key="index">
          <div v-if="item.node.estado != 'FINALIZADO'">
            <p>
              <button
                class="accordion-button collapsed"
                data-toggle="collapse"
                :data-target="'#' + index"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <p>{{ "Usuario " }}{{ item.node.usuario.nombre }}</p>
              </button>
            </p>
            <div class="collapse" :id="index">
              <div class="card card-body">
                <p>{{ "Tipo solicitud " + item.node.tipo }}</p>
                <p>{{ "Estado " + item.node.estado }}</p>
                <p>
                  {{ "Fecha inscripcion " + item.node.fechaInscripcion }}
                </p>
                <p>
                  {{ "Nombre Solicitante " + item.node.nombreSolicitante }}
                </p>
                <textarea
                  :id="item.node.id"
                  cols="30"
                  rows="10"
                  style="
                    height: 100px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                  "
                ></textarea>
                <button
                  style="background: #3ea3cd; border: none"
                  v-on:click="respuestaSolicitud(item.node)"
                  type="button"
                  class="btn btn-success"
                >
                  Responder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "../../components/header.vue";
import NavAdmin from "./navAdmin.vue";
console.log("id", localStorage.id);

export default {
  name: "SolicitudPartidas",

  components: {
    NavAdmin,
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
    tildes(cadena){

      if(cadena=='comunion'){return 'comunión'}
      if(cadena=='confirmacion'){return 'confirmación'}
      if(cadena=='defuncion'){return 'defunción'}

      return cadena

    },
    respuestaSolicitud(item) {
      var updateRespuesta = document.getElementById(item.id).value.toString();
      var tipo = item.tipo;
      console.log(tipo.toLowerCase());
      console.log(updateRespuesta);

      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/Admin/updateSolicitudPartida.gql"),
          // Define las variables
          variables: {
            id: item.id,
            tipo: this.tildes(tipo.toLowerCase()),
            estado: "finalizado",
            respuesta: updateRespuesta,
          },
          //línea para actualizar
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log("Registro de Usuario:", response.data);
        });
      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/Admin/listSolicitudPartida.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log(response.data.allSolicitudPartidas.edges);
          this.allSolicitudPartidas.edges =
            response.data.allSolicitudPartidas.edges;
          this.$swal("Confirmación", "Solicitud Atentida", "success").then(() => {
          // Aquí la alerta se ha cerrado}
          //this.$router.push({ name: "inscribirCurso" });
          location.reload(true);
            });
        });
        
    },
    filtrar(e) {
      console.log("cambio", e.target.value);

      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/Admin/listSolicitudPartida.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log(response.data.allSolicitudPartidas.edges);
          this.allSolicitudPartidas.edges =
            response.data.allSolicitudPartidas.edges.filter(function (elem) {
              console.log(elem.node.tipo);
              console.log(e.target.value);
              return elem.node.tipo === e.target.value;
            });
        });
    },
  },
  apollo: {
    allSolicitudPartidas: {
      // Consulta
      query: require("@/graphql/Admin/listSolicitudPartida.gql"),
      // Asigna el error a la variable definida en data
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
.accordion-button {
  width: 100%;
  background: lightslategrey;
  color: white;
  font-size: 1rem;
  border-radius: 10px;
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
.general {
  margin: 0 auto;
  width: 90%;
  color: rgba(0, 0, 0, 0.4);
}
select.form-select {
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.4);
}
.myfiltro {
  grid-row-start: 1;
  grid-row-end: 2;
}
.filtro {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 15px;
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
