<template>
    <header>
        <!-- Background image -->
      <div
        class="p-5 text-center bg-image"
      >
      <div class="mask" style="background-color: rgba(0, 0, 0, 0.4);">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">Parroquia Santísima Trinidad</h1>
            </div>
          </div>
        </div>
      <div
      id="carouselExampleSlidesOnly"
      class="carousel slide"
      data-ride="carousel"
    >
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="@/../images/aviso.jpg"
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="@/../images/InfoCurso.jpg"
              alt="Second slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="@/../images/santisimoSagrario.jpg"
              alt="Third slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="@/../images/imagen.jpeg"
              alt="Third slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="@/../images/padre.jpeg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    
      </div>
      <!-- Background image -->
    </header>

</template>

<script>
    export default { 
        data(){
            return {
            headerComp: ''
            }
        }
    }
</script>
<style scoped>
div#carouselExampleSlidesOnly {
    width: 75% !important;
    margin: 0 auto;
}
img{
  height: 500px;
  width: 50px;
}
</style>