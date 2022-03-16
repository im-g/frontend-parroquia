<template>
<div> 
  <mynav></mynav>
  <myheader></myheader>
  <div class="wrapper fadeInDown general">
     <h1 style="text-align:center;font-weight: bold;margin-bottom: 40px;">SOLICITUDES CITAS</h1>
    
      <div class="myfiltro" style="display: flex;justify-content: center;margin: 15px 0px; gap:20px;align-items: center;">
        <div style="text-align: center;">
          <h3>Crear solicitud cita</h3>
          
        </div>
        
        <button
            class="btnuno"
            v-on:click="crearPartida"
          >
            Crear
          </button>
      </div>
      <p style="text-align:center;">A Continuación  puede seleccionar el botón crear para generar una nueva solicitud de cita</p>    
      <h2 style="text-align: center; font-weight: bold;margin-top: 40px;">
        MIS SOLICITUDES CITAS
      </h2>
        <p style="text-align:center;">Se listan todas las solicitudes de citas generadas por el usuario en sesión  </p>    
        <div class="bucle">
          <div v-for="(item, index) in allSolicitudes.edges" :key="index">
            <div v-if="item.node.usuario.id == id">
              <p>
                <button
                  class="accordion-button collapsed"
                  data-toggle="collapse"
                  :data-target="'#' + index"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  
                >
                <p>{{ item.node.servicio.nombreServicio }}</p>
                  
                </button>
                
              </p>
              <div class="collapse" :id="index">
                <div class="card card-body">
                  <p>{{ "Estado " + item.node.estado }}</p>
                  <p>{{ "Fecha " + item.node.fecha }}</p>
                  <p>{{ "Hora " + item.node.hora }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</div>
</template>
<script>
import mynav from './mynav.vue'

import myheader from '../../components/header.vue'
export default {
  name: "solicitarCita",
  components:{
    mynav,
    myheader,

  },
  data() {
    return {
      id: "",
      horaSolicitud: "",
      fechaSolicitud: "",
      nombreServicio: "",
      nombreUsuario: "",
      templo: "",
      Servicio: "",
      idTemplo: "",
      idServicio: "",
      allServicios: Object,
      allTemplos: Object,
      allSolicitudes: Object,
    };
  },
  mounted() {
    if (localStorage.id) {
      this.id = localStorage.id;
    }
  },
  methods: {
    editar() {
      this.$router.push({ name: "editarCita" });
    },
    //Codigo a Ejecutar al Cargar la Pagina

    async queryServicios() {
      await this.$apollo
        .query({
          query: require("@/graphql/User/allServicios.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          this.allServicios = response.data.allServicios.edges;
        });
    },
    async queryTemplos() {
      await this.$apollo
        .query({
          query: require("@/graphql/User/allTemplos.gql"),
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          this.allTemplos = response.data.allTemplos.edges;
        });
    },
    crearPartida(){
      this.$router.push({ name: "crearSolicitudCita" });      
    },
    obteneridTemplo() {
      for (let variable of this.allTemplos) {
        if (variable.node.nombre == this.templo) {
          this.idTemplo = variable.node.id;
        }
      }
    },
    obteneridServicio() {
      for (let variable of this.allServicios) {
        if (variable.node.nombreServicio == this.Servicio) {
          this.idServicio = variable.node.id;
        }
      }
    },

    solicitarCita() {
      
      this.obteneridTemplo();
      this.obteneridServicio();
      this.$apollo
        .mutate({
          // Establece la mutación de crear
          mutation: require("@/graphql/User/crearSolicitudCita.gql"),
          // Define las variables
          variables: {
            hora: this.horaSolicitud,
            fecha: this.fechaSolicitud,
            usuarioId: this.id,
            temploId: this.idTemplo,
            servicioId: this.idServicio,
          },
          //línea para actualizar
          fetchPolicy: "no-cache",
        })
        .then((response) => {
          console.log("creación de Solicitud:", response.data);

          this.$swal(
            "Confirmación",
            "Solicitud creada exitosamente",
            "success"
          ).then(() => {
            // Aquí la alerta se ha cerrado}
            location.reload(true);
          });
        });
    },
  },
  created() {
    this.queryServicios();
    this.queryTemplos();
  },
  apollo: {
    allSolicitudes: {
      // Consulta
      query: require("@/graphql/User/listarSolicitudes.gql"),
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
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.accordion-button{
  width: 100%;
  background: lightslategrey;
  color: white;
  font-size: 1rem;
  border-radius: 10px;
}
.general{
  margin: 0 auto;
    width: 90%;
    color:rgba(0, 0, 0, 0.4);
    
}
.card-body{
  align-items: start;
}
.btnuno{
  border-radius: 10px;
  background-color: #3ea3cd;
  color: white;
  border: none;
  width: 25%;
    padding: 7px;
}
.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
input[type="date"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
p{
  color: black;
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
.form-select::-ms-expand {
  display: none;
}

.form-select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.form-select option {
  font-weight: normal;
}
input[type="select"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type="time"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

.contenedor {
  position: relative;
  display: inline-block;
  text-align: center;
}
/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  text-align: center;
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
</style>