<template>
<!--gestión citas general-->
  <div>
    <nav-admin></nav-admin>
    <div class="wrapper fadeInDown">
      <div class="contenedor-filtro">
        <div class="contenedor">
          <img src="@/../images/parroquia.jpg" width="600" height="320" />
        </div>
        <div class="filtro">
          <div class="bucle">
            <div v-if="datatime != 'nodata'">
            <div v-for="(item, index) in allSolicitudes.edges" :key="index">
              <div v-if="item.node.estado == 'SOLICITADO'">
                <p>
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    data-toggle="collapse"
                    :data-target="'#' + index"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <p>
                      {{ "Hora Agenda " + item.node.hora }}{{ " / Solicitante "
                      }}{{ item.node.usuario.nombre}}
                    </p>
                  </button>
                </p>
                <div class="collapse" :id="index">
                  <div class="card card-body">
                    <p>
                      {{
                        "Tipo solicitud " + item.node.servicio.nombreServicio
                      }}
                    </p>
                    <p>{{ "Estado " + item.node.estado }}</p>
                    <p>
                      {{ "Nombre solicitante " + item.node.usuario.nombre }}
                    </p>
                    <p>{{ "Templo agendado  " + item.node.templo.nombre }}</p>
                    <p>{{ "Fecha agendada " + item.node.fecha }}</p>
                    <p>{{ "Hora agendada " + item.node.hora }}</p>
                    <button
                      v-on:click="respuestaSolicitud(item.node, 'separado')"
                      type="button"
                      class="btn btn-success"
                    >
                      Aprobado
                    </button>
                    <button
                      v-on:click="respuestaSolicitud(item.node, 'cancelado')"
                      type="button"
                      class="btn btn-danger"
                    >
                      Desaprobado
                    </button>
                  </div>
                </div>
              
              </div>
            
            </div>
            
            </div>
            <div v-else>
                <h2>Seleccionar fecha de Solicitudes</h2>
            </div>
          </div>

          <div class="myfiltro">
            <h2>Fecha Solicitudes</h2>
            <input
              type="date"
              v-on:change="filtrar($event)"
              id="start"
              name="trip-start"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavAdmin from './navAdmin.vue'
console.log("id", localStorage.id);

export default {
  name: "SolicitudCitasGestion",

  components: {
    NavAdmin,
  },
  data() {
    return {
      allSolicitudes: Object,
      id: "",
      nombre: "",
      password: "",
      selected: "",
      datatime: "nodata",
    };
  },
  mounted() {
    if (localStorage.id) {
      this.id = localStorage.id;
    }
  },

  methods: {
    respuestaSolicitud(item, rta) {
      console.log(rta);
      console.log(item.id);
      console.log(item.hora);
      console.log(item.fecha);
      console.log(item.usuario.id);
      console.log(item.templo.id);
      console.log(item.servicio.id);

      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/Admin/updateSolicitudCita.gql"),
          // Define las variables
          variables: {
            id: item.id,
            hora: item.hora,
            fecha: item.fecha,
            estado: rta,
            usuarioId: item.usuario.id,
            temploId: item.templo.id,
            servicioId: item.servicio.id,
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
          mutation: require("@/graphql/Admin/listSolicitudCita.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log(response.data.allSolicitudes.edges);
          this.allSolicitudes.edges = response.data.allSolicitudes.edges;
        });
    },
    filtrar(e) {
      console.log("cambio", e.target.value);
      this.datatime = e.target.value;
      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/Admin/listSolicitudCita.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log(response.data.allSolicitudes.edges);
          this.allSolicitudes.edges = response.data.allSolicitudes.edges.filter(
            function (elem) {
              console.log(elem.node.fecha);
              console.log(e.target.value);
              return elem.node.fecha === e.target.value;
            }
          );
        });
    },
  },
  apollo: {
    allSolicitudes: {
      // Consulta
      query: require("@/graphql/Admin/listSolicitudCita.gql"),
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
