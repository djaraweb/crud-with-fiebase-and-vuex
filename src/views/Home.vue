<template>
  <div>
    <h1>Bienvenido:</h1>
    {{getUsuario.email}}
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["getUsuario"])
  }
};
</script>