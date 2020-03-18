<template>
  <section class="container">
    <br />

    <div class="row">
      <div class="col-md-12">
        <div class="float-right">
          <router-link :to="{name: 'AgregarTask'}" class="btn btn-primary">Agregar Tarea</router-link>
        </div>
        <h4 class="text-left text-primary">Lista de Tareas</h4>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-12">
        <div v-if="getLoading">
          <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
          <ul v-if="getTasks" class="list-group">
            <template v-for="task of getTasks">
              <Task :task="task" :key="task.id" />
            </template>
          </ul>
          <ul v-else class="list-group">
            <li class="list-group-item">No Existen Tareas</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Task from "@/components/Task.vue";
export default {
  name: "Tasks",
  components: {
    Task
  },
  computed: {
    ...mapGetters(["getTasks", "getLoading"])
  },
  methods: {
    ...mapActions(["loadTasks"])
  },
  created() {
    this.loadTasks();
  }
};
</script>