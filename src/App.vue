<template>
  <div>
    <div class="jumbotron">
      <router-view />
      
    </div> 
    <my-footer></my-footer> 
  </div>
</template>

<script>
//import mynav from "./components/mynav.vue";
import myFooter from "./components/footer.vue"
//import HeaderComp from "./components/header.vue"
export default {
  name: "App",
  components: {
    //Login,
    //mynav,
    myFooter,
   // HeaderComp,
  },
 };
</script>