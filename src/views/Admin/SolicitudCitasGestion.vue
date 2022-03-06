<template>
  <!--gestión citas general-->
  <div>
    <nav-admin></nav-admin>
    <myheader></myheader>
    <div class="wrapper fadeInDown general">
      <h1 style="text-align:center;font-weight: bold;margin-bottom: 40px;">GESTION SOLICITUDES CITAS</h1>
      <div class="myfiltro" style="display: flex;justify-content: center;margin: 15px 0px; gap:20px;align-items: center;">
        
        <div style="text-align: center;">
          <h3>seleccionar fecha</h3>
          
        </div>
        
            
            <input type="date"
              v-model="myfecha"
              v-on:change="filtrar()"
              id="start"
              name="trip-start"/>
          </div>
            <p style="text-align:center;">Se van a listar todas las solicitudes en estado solicitado para la fecha seleccionada  </p>

          <div class="info-filtro">
            <div>
              <div style="background:#3ea3cd; border-radius:10px; color:white;padding: 0.5rem;">
                <p class="myp">Aprobado</p>
              </div>
              
              <p>Se aprueba una solicitud de un usuario y pasa a ser parte del cronograma de compromisos de la parroquia para la fecha establecida</p>
            </div>
            <div>
              <div style="background:#8c8e8f; border-radius:10px; color:white;padding: 0.5rem;">
                <p class="myp">Desaprobado</p>
              </div>
              
              <p>Se desaprueba una solicitud de un usuario al no poder agendarse por no cumplir con los requisitos necesarios para ser aprobada</p>
            </div>
            
          </div>
        
          <div class="bucle">
            <div v-if="datatime != 'nodata'">
              <div v-for="(item, index) in allSolicitudes.edges" :key="index">
                <div v-if="item.node.estado == 'SOLICITADO'">
                  <p>
                    <button
                    style="margin: 0;"
                      class="accordion-button collapsed"
                      data-toggle="collapse"
                      :data-target="'#' + index"
                      aria-expanded="false"
                      aria-controls="collapseExample">
                      <p>{{ "Hora Agenda " + item.node.hora}}{{ " / Solicitante " }}{{ item.node.usuario.nombre }}</p>
                    </button>
                  </p>
                  <div class="collapse" :id="index">
                    <div class="card card-body">
                      <p>{{"Tipo solicitud " + item.node.servicio.nombreServicio}} </p>
                      <p>{{ "Estado " + item.node.estado }}</p>
                      <p>{{ "Nombre solicitante " + item.node.usuario.nombre }}</p>
                      <p>{{ "Templo agendado  " + item.node.templo.nombre }}</p>
                      <p>{{ "Fecha agendada " + item.node.fecha }}</p>
                      <p>{{ "Hora agendada " + item.node.hora }}</p>
                      <button style="background:#3ea3cd;border: none;margin-bottom: 10px;" v-on:click="respuestaSolicitud(item.node, 'separado')" type="button" class="btn btn-success">Aprobado</button>
                      <button style="background:#8c8e8f;border: none;" v-on:click="respuestaSolicitud(item.node, 'cancelado')" type="button"  class="btn btn-danger">Desaprobado</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p style="text-align:center;color: white;background-color: darkgray;">Por favor Seleccionar fecha de Solicitudes</p>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import NavAdmin from "./navAdmin.vue";

import myheader from "../../components/header.vue";
console.log("id", localStorage.id);

export default {
  name: "SolicitudCitasGestion",

  components: {
    NavAdmin,
    myheader,
  },
  data() {
    return {
      allSolicitudes: Object,
      id: "",
      nombre: "",
      password: "",
      selected: "",
      datatime: "nodata",
      myfecha:""
    };
  },
  mounted() {
    if (localStorage.id) {
      this.id = localStorage.id;
    }
    this.myfecha=new Date().toISOString().substr(0, 10);
    this.filtrar();
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
          this.$swal("Resultado", "Solicitud Atendida", "success").then(() => {
            // Aquí la alerta se ha cerrado}
            //location.reload(true);
          });
          this.allSolicitudes.edges = response.data.allSolicitudes.edges;
          this.filtrar();
        });
    },
    filtrar() {
      //console.log("cambio", e.target.value);
      let self=this;
      this.datatime = this.myfecha;
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
              //console.log(e.target.value);
              return elem.node.fecha === self.myfecha;
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
.myp{
  margin: 0;
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
.info-filtro{
  text-align: center;
  display: flex;
    justify-content: space-around;
    gap: 10px;
}
.general{
  margin: 0 auto;
    width: 90%;
}
input#start {
    border-radius: 10px;
    border: none;
    font-size: 1.5rem;
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
.accordion-button{
  width: 100%;
  background: lightslategrey;
  color: white;
  font-size: 1rem;
  border-radius: 10px;
}
/* OTHERS */

*:focus {
  outline: none;
}
</style>
