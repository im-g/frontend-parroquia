<template>
  <div>
    <mynav></mynav>
    <myheader></myheader>
    <div class="wrapper fadeInDown general">
      <h1
        style="text-align: center; 
      font-weight: bold; 
      margin-bottom: 40px
      color: rgba(0, 0, 0, 0.4);"
      >
        SOLICITUDES PARTIDAS
      </h1>
        <h3
          class="pt-3"
          style="
            display: flex;
            justify-content: center;
            margin: 15px 0px;
            gap: 20px;
            align-items: center;
          "
        >
          Crear Solicitud Partida
        </h3>
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
        <select
          class="form-select"
          aria-label="Default select example"
          id="tipopartida"
        >
          <option selected disabled>Seleccionar Tipo</option>
          <option>bautismo</option>
          <option>comunión</option>
          <option>confirmación</option>
          <option>matrimonio</option>
          <option>defunción</option>
        </select>
        </div>
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
            <h3>seleccionar fecha</h3>
          </div>
          <input
            type="date"
            v-model="fechaInscripcion"
            id="start"
            name="trip-start"
          />
        </div>
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
          <button class="btnuno" v-on:click="crearSolicitud">Crear</button>
        </div>
      </div>
    </div>
</template>



<script>
import mynav from "./mynav.vue";
import myheader from "../../components/header.vue";
export default {
  name: "crearSolicitud",
  components: {
    myheader,
    mynav,
  },
  data() {
    return {
      tipo: "",
      fechaInscripcion: "",
      usuarioId: "",
    };
  },
  mounted() {
    if (localStorage.id) {
      this.usuarioId = localStorage.id;
    }
    this.fechaInscripcion = new Date().toISOString().substr(0, 10);
  },
  methods: {
    crearSolicitud() {
      var updateRespuesta = document
        .getElementById("tipopartida")
        .value.toString()
        .toLowerCase();

      this.tipo = updateRespuesta;
      console.log("fecha", this.fechaInscripcion);
      console.log("usuario ", this.usuarioId);
      console.log(this.tipo);
      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/User/crearSolicitudPartida.gql"),
          // Define las variables
          variables: {
            tipo: this.tipo,
            fecha: this.fechaInscripcion,
            id: this.usuarioId,
          },
          //línea para actualizar
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          this.$swal("Correcto", "Partida creada correctamente", "success");
          console.log("Registro de crear Solicitud de Partida:", response.data);
          this.$router.push({ name: "partidasGeneradas" });
        });
    },
  },
};
</script>

#estilos
<style scoped>
html {
  background-color: #56baed;
}
.btnuno {
  border-radius: 10px;
  align-content: center;
  background-color: #3ea3cd;
  color: white;
  border: none;
  width: 25%;
  padding: 7px;
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
.form-select {
  display: block;
  font-size: 16px;
  font-family: "Verdana", sans-serif;
  font-weight: 400;
  color: #444;
  line-height: 1.3;
  padding: 0.4em 1.4em 0.3em 0.8em;
  width: 340px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 10px auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
select.form-select {
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.4);
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