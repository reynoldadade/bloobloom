import HomeView from "../views/Home.vue";
const routes = [
  {
    path: "/collections/:url",
    component: HomeView,
    alias: "/collections/spectacles-women",
    name: "collections",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/collections/spectacles-women",
  },
];

export default routes;
