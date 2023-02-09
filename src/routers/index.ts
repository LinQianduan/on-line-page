import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter, notFoundRouter } from "@/routers/modules/staticRouter";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter, notFoundRouter ]
})

export default router