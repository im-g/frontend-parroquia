<template>
    <div class="container">
        <div class="row">
            <div class="col">
            <div class="card text-black text-center bg-light mb-3">
              <div class="card-header">Citas generales</div>
              <div class="card-body">
                <img class="card-img" src="https://stcharleshouston.org/pictures/2019/8/direccion%20espiritual%20jesus%20y%20la%20samaritana.jpg" alt="">
                <p class="card-text">Aquí podrás realizar la solicitud de una
                    cita para consejería, dirección espiritual, entre otros.</p>
                <button class="btn btn-primary" onclick="window.location.href='/CitasGenerales'">
                  Solicitar cita</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default 
{
    data(){
            return {
            cardInfo: ''
            }
        }
}
</script>