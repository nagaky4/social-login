import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./components/Login/Login.vue";

// Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import("./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      component: Login
    }
  ]
});

export default router;
