import { createApp } from "vue";
import App from "./App.vue";

import { NotificationsPlugin, ModalPlugin, IconPlugin } from "purplefox-tools";

import "purplefox-tools/style.css";
import "./style/index.css";

createApp(App)
    .use(NotificationsPlugin)
    .use(IconPlugin)
    .use(ModalPlugin)
    .mount("#app");
