import HomeView from "../views/Home.vue";
const routes = [
  {
    path: "/collections/:url",
    component: HomeView,
    alias: "/:url",
    name: "collections",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/collections/spectacles-women",
  },
];

export default routes;
