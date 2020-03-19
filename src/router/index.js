import Vue from "vue";
import VueRouter from "vue-router";
var firebase = require("firebase/app");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../views/Tasks.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/edittask/:Id",
    name: "EditarTask",
    component: () => import("../views/EditarTask.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/addtask",
    name: "AgregarTask",
    component: () => import("../views/AddTask.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/registrarusuario",
    name: "RegistrarUser",
    component: () => import("../views/Registro.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some((record) => record.meta.requiresAuth);
  const user = firebase.auth().currentUser;
  if (rutaProtegida === true && user === null) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
