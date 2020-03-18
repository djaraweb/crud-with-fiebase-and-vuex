<template>
  <li class="list-group-item text-left">
    {{task.name}}
    <div class="float-right">
      <router-link
        class="btn btn-warning mr-2"
        :to="{name: 'EditarTask', params: {
        Id: task.id
      }}"
      >
        <i class="fa fa-edit"></i>
        Editar
      </router-link>
      <button class="btn btn-danger" @click="eliminarTask(task.id)">
        <i class="fa fa-trash"></i>
        Eliminar
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Task",
  props: {
    task: {
      required: true,
      type: Object
    }
  },
  methods: {
    ...mapActions(["eliminarTask"])
  }
};
</script>