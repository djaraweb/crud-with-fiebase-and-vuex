import Vue from "vue";
import Vuex from "vuex";
import db from "@/firebase";
//var db = require("firebase/app");
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showAlert: false,
    loading: false,
    tasks: [],
    task: {},
    usuario: "",
    error: ""
  },
  getters: {
    getTasks: (state) => state.tasks,
    getTask: (state) => state.task,
    getLoading: (state) => state.loading,
    getUsuario: (state) => state.usuario,
    getError: (state) => state.error,
    getShowAlert: (state) => state.showAlert,
    existsUsers(state) {
      if (
        state.usuario === null ||
        state.usuario === "" ||
        state.usuario === undefined
      )
        return false;
      else return true;
    }
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
    },
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    showMessageAlert(state) {
      state.showAlert = true;
      setTimeout(() => {
        state.showAlert = false;
      }, 5000);
    }
  },
  actions: {
    loadTasks({ commit }) {
      this.state.loading = true;
      let tasks = [];

      db.firestore()
        .collection("tasks")
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
      db.firestore()
        .collection("tasks")
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
      db.firestore()
        .collection("tasks")
        .doc(task.id)
        .update({
          name: task.name
        })
        .then(() => router.push({ name: "Tasks" }))
        .finally(() => (this.state.loading = false));
    },
    agregarTask({ commit }, task) {
      this.state.loading = true;
      db.firestore()
        .collection("tasks")
        .add(task)
        .then((doc) => {
          //console.log(doc.id);
          router.push({ name: "Tasks" });
        })
        .finally(() => (this.state.loading = false));
    },
    eliminarTask({ commit, dispatch }, Id) {
      this.state.loading = true;
      db.firestore()
        .collection("tasks")
        .doc(Id)
        .delete()
        .then(() => {
          console.log("Tarea fue eliminada");
          //dispatch("loadTasks"); // Una forma de usar Dispatch
          commit("eliminarTask", Id);
        })
        .finally(() => (this.state.loading = false));
    },
    // Administración de Usuarios:
    registrarUsuario({ commit }, user) {
      this.state.loading = true;
      db.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          //console.log("Email:", res.user.email);
          //console.log("UserID:", res.user.uid);
          commit("setUsuario", {
            email: res.user.email,
            uid: res.user.uid
          });
          router.push({ name: "Home" });
        })
        .catch((err) => {
          //console.log("Error: ", err);
          commit("setError", {
            code: err.code,
            message: err.message
          });
          commit("showMessageAlert");
        })
        .finally(() => (this.state.loading = false));
    },
    login({ commit }, payload) {
      this.state.loading = true;
      db.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          //console.log("Login:", res);
          commit("setUsuario", {
            email: res.user.email,
            uid: res.user.uid
          });
          router.push({ name: "Home" });
        })
        .catch((err) => {
          //console.log("Error: ", err);
          commit("setError", {
            code: err.code,
            message: err.message
          });
          commit("showMessageAlert");
        })
        .finally(() => (this.state.loading = false));
    },
    detectarUsuario({ commit }, payload) {
      if (payload) {
        commit("setUsuario", {
          email: payload.email,
          uid: payload.uid
        });
      } else {
        commit("setUsuario", null);
      }
    },
    logout({ commit }) {
      //console.log("logout");
      db.auth().signOut();
      commit("setUsuario", null);
      router.push({ name: "Login" });
    }
  }
});
