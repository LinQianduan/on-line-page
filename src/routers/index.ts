import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter, notFoundRouter } from "@/routers/modules/staticRouter";
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter, notFoundRouter ]
})

NProgress.configure({
  showSpinner: false, // 关闭loading
  parent: '#my-progress'
});
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router