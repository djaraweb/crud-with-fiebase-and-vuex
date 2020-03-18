import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/",
    name: "Tasks",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "../views/Tasks.vue")
  },
  {
    path: "/edittask/:Id",
    name: "EditarTask",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "../views/EditarTask.vue")
  },
  {
    path: "/addtask",
    name: "AgregarTask",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "../views/AddTask.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
