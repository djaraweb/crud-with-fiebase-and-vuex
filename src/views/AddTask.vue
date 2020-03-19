<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <h4 class="text-left text-primary">Agregar Tarea</h4>
        <div v-if="getLoading" class="text-center">
          <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
          <form @submit.prevent="agregarTask(task)">
            <div class="col-auto">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">Tarea :</div>
                </div>
                <input type="text" class="form-control" v-model="task.name" />
              </div>
              <button type="submit" class="btn btn-primary mb-2">Grabar Tarea</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <br />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddTask",
  data() {
    return {
      task: {
        name: "",
        completed: true
      }
    };
  },
  computed: {
    ...mapGetters(["getLoading"])
  },
  methods: {
    ...mapActions(["agregarTask"])
  }
};
</script>