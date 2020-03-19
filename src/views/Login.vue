<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <h4 class="text-left text-primary">Login de Acceso</h4>
        <div v-if="getLoading" class="text-center">
          <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
          <div
            v-if="getShowAlert"
            class="alert alert-danger"
            role="alert"
          >Code: [{{getError.code}}] - {{getError.message}}</div>
          <form @submit.prevent="login(user)">
            <div class="form-group row">
              <div class="col-md-12">
                <label class="form-control-label">
                  Email
                  <span class="text-danger">&nbsp; (*)</span>
                </label>
                <input type="email" class="form-control" v-model="user.email" />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-md-12">
                <label class="form-control-label">
                  Contraseña
                  <span class="text-danger">&nbsp; (*)</span>
                </label>
                <input type="password" class="form-control" v-model="user.password" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
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
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getLoading", "getError", "getShowAlert"])
  },
  methods: {
    ...mapActions(["login"])
  }
};
</script>