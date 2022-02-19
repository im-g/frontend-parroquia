<template>
  <div>
  <mynav></mynav>
  <router-view />
  <my-footer></my-footer>
  </div>  
</template>

<script>
import mynav from "./components/mynav.vue";
import myFooter from "./components/footer.vue"
export default {
  name: "App",
  components: {
    //Login,,
    mynav,
    myFooter,
  },
 };
</script>