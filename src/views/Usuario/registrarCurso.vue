<template>
  <!--gestión citas general-->
  <div>
    <mynav></mynav>
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
        Inscribir en Cursos
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
          <h3>fecha inicio</h3>
        </div>
        <input type="date" v-model="fechaInicio" id="start" name="trip-start" />
        <div style="text-align: center">
          <h3>fecha fin</h3>
        </div>
        <input type="date" v-model="fechaFin" id="start" name="trip-start" />
      </div>
      <p style="text-align: center">
        Se van a listar todas los cursos disponibles
      </p>

      <div class="bucle">
        <div v-for="(item, index) in allCursos.edges" :key="index">
          <p>
            <button
              style="margin: 0"
              class="accordion-button collapsed"
              data-toggle="collapse"
              :data-target="'#' + index"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <p>
                {{ item.node.nombreCurso }}
              </p>
            </button>
          </p>
          <div class="collapse" :id="index">
            <div class="card card-body">
              <p>
                {{ "Nombre del Curso " + item.node.nombreCurso }}
              </p>
              <p>
                {{ "Lugar " + item.node.lugar }}
              </p>
              <div v-if="buscar(item) == true">
                <button
                  style="background: #8c8e8f; border: none"
                  type="button"
                  class="btn btn-danger"
                >
                  Inscrito
                </button>
              </div>
              <div v-else>
                <button
                  style="background: #3ea3cd; border: none; margin-bottom: 10px"
                  v-on:click="inscribir(item.node)"
                  type="button"
                  class="btn btn-success"
                >
                  Inscribir
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
import mynav from "./mynav.vue";

import myheader from "../../components/header.vue";
console.log("id", localStorage.id);

export default {
  name: "registrarCurso",

  components: {
    mynav,
    myheader,
  },
  data() {
    return {
      allCursos: Object,
      allRegistrosCursos: Object,
      id: "",
      nombreCurso: "",
      fechaInicio: "",
      fechaFin: "",
      lugar: "",
    };
  },
  mounted() {
    if (localStorage.id) {
      this.id = localStorage.id;
    }
    this.fechaInicio = new Date().toISOString().substr(0, 10);
    this.fechaFin = new Date().toISOString().substr(0, 10);
  },

  methods: {
    async queryRegistrosCursos() {
      await this.$apollo
        .query({
          query: require("@/graphql/User/allRegistrosCursos.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          this.allRegistrosCursos = response.data.allRegistroCurso.edges;
        });
    },
    buscar(item){
        for (let i = 0; i< this.allRegistrosCursos.length; i++){
           if(this.allRegistrosCursos[i].node.usuario.id == this.id & item.node.id == 
           this.allRegistrosCursos[i].node.curso.id){
                return true;
           }
        }
        return false;
    },
    inscribir(item) {
      console.log("fecha i", this.fechaInicio);
      console.log("fecha fin ", this.fechaFin);
      console.log("Nombre Curso ", item.nombreCurso);
      console.log("lugar ", item.lugar);
      console.log("id Curso", item.id);
      console.log("id Usuario", this.id);
      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/User/inscribirCurso.gql"),
          // Define las variables
          variables: {
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin,
            usuarioId: this.id,
            cursoId: item.id,
          },
          //línea para actualizar
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log("registo a Curso:", response.data);
          this.$swal("Confirmación", "Registro creado exitosamente", "success")
          .then(() => {
          // Aquí la alerta se ha cerrado}
          //this.$router.push({ name: "inscribirCurso" });
          location.reload(true);
            });
        });
    },
  },
  created() {
    this.queryRegistrosCursos();
  },
  apollo: {
    allCursos: {
      // Consulta
      query: require("@/graphql/User/allCursos.gql"),
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
.myp {
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
.info-filtro {
  text-align: center;
  display: flex;
  justify-content: space-around;
  gap: 10px;
}
.general {
  margin: 0 auto;
  width: 90%;
  color: rgba(0, 0, 0, 0.4);
}
input#start {
  border-radius: 10px;
  border: none;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.4);
}
p{
  color: black;
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
.accordion-button {
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
