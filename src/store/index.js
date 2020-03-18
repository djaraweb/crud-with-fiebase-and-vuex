import Vue from "vue";
import Vuex from "vuex";
import db from "@/firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    tasks: [],
    task: {}
  },
  getters: {
    getTasks: (state) => state.tasks,
    getTask: (state) => state.task,
    getLoading: (state) => state.loading
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
    setTask(state, payload) {
      state.task = payload;
    },
    eliminarTask(state, Id) {
      state.tasks = state.tasks.filter((task) => {
        return task.id != Id;
      });
    }
  },
  actions: {
    loadTasks({ commit }) {
      this.state.loading = true;
      let tasks = [];

      db.collection("tasks")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            let task = item.data();
            task.id = item.id;
            tasks.push(task);
          });
        })
        .finally(() => (this.state.loading = false));
      commit("setTasks", tasks);
    },
    loadTask({ commit }, Id) {
      this.state.loading = true;
      db.collection("tasks")
        .doc(Id)
        .get()
        .then((doc) => {
          let task = doc.data();
          task.id = doc.id;
          commit("setTask", task);
          //console.log(task);
        })
        .finally(() => (this.state.loading = false));
    },
    editarTask({ commit }, task) {
      this.state.loading = true;
      db.collection("tasks")
        .doc(task.id)
        .update({
          name: task.name
        })
        .then(() => router.push("/"))
        .finally(() => (this.state.loading = false));
    },
    agregarTask({ commit }, task) {
      this.state.loading = true;
      db.collection("tasks")
        .add(task)
        .then((doc) => {
          console.log(doc.id);
          router.push("/");
        })
        .finally(() => (this.state.loading = false));
    },
    eliminarTask({ commit, dispatch }, Id) {
      this.state.loading = true;
      db.collection("tasks")
        .doc(Id)
        .delete()
        .then(() => {
          console.log("Tarea fue eliminada");
          //dispatch("loadTasks"); // Una forma de usar Dispatch
          commit("eliminarTask", Id);
        })
        .finally(() => (this.state.loading = false));
    }
  }
});
