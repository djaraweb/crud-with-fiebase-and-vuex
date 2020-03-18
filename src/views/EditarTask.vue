<template>
  <section class="container">
    <br />
    <h4 class="text-left text-primary">Editar Tarea</h4>
    <!-- {{getTask}} -->
    <div v-if="getLoading">
      <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <form @submit.prevent="editarTask(getTask)">
        <div class="col-auto">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Tarea :</div>
            </div>
            <input type="text" class="form-control" v-model="getTask.name" />
          </div>
          <button type="submit" class="btn btn-primary mb-2">Actualizar Tarea</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditarTask",
  data() {
    return {
      Id: this.$route.params.Id
    };
  },
  computed: {
    ...mapGetters(["getTask", "getLoading"])
  },
  methods: {
    ...mapActions(["loadTask", "editarTask"])
  },
  created() {
    this.loadTask(this.Id);
  }
};
</script>