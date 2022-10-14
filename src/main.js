import "./app.postcss";
import App from "./App.svelte";
import "./assets/globals.css"

const app = new App({
  target: document.getElementById("app"),
});

export default app;
