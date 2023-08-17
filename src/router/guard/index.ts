import nprogress from "nprogress";
import router from "..";
import "nprogress/nprogress.css";
router.beforeEach(() => {
  nprogress.start();
});
router.afterEach(() => {
  nprogress.done();
});
