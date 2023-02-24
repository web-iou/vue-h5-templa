import { createApp } from "vue";
import "./style/reset.css";
import App from "./App.vue";
import { setupEllipsisDirective } from "./directives/text-overflow";
const app = createApp(App);
setupEllipsisDirective(app);
app.mount("#app");
