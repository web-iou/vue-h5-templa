import { createApp } from "vue";
import "./style/style.css";
import App from "./App.vue";
import { setupEllipsisDirective } from "./directives/text-overflow";
import router from "./router";
import './router/guard'
const app = createApp(App);
setupEllipsisDirective(app);
app.use(router).mount("#app");
