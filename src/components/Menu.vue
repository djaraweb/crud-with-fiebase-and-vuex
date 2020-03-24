<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav">
    <div class="navbar-brand">
      <img src="@/assets/logo.png" height="20px" alt="Logo de Vue" />
      CRUD con Firebase
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="!existsUsers">
          <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
        </li>
        <li class="nav-item" v-if="!existsUsers">
          <router-link class="nav-link" :to="{name: 'RegistrarUser'}">Registry</router-link>
        </li>

        <li class="nav-item" v-if="existsUsers">
          <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
        </li>
        <li class="nav-item" v-if="existsUsers">
          <router-link class="nav-link" :to="{name: 'Tasks'}">Tasks</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'About'}">About</router-link>
        </li>
        <li class="nav-item" v-if="existsUsers">
          <a class="nav-link" @click="logout" href="#">Logout</a>
        </li>
      </ul>
      <form
        class="form-inline my-2 my-lg-0"
        @submit.prevent="filtrarTasks(txt_filtro)"
        v-if="existsUsers"
      >
        <input
          v-model="txt_filtro"
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search tasks"
          @keyup="filtrarTasks(txt_filtro)"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      txt_filtro: ""
    };
  },
  methods: {
    ...mapActions(["logout", "filtrarTasks"])
  },
  computed: {
    ...mapGetters(["existsUsers"])
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>