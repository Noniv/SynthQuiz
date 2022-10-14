<script>
import Router from "svelte-spa-router"
import Home from "./routes/Home.svelte";
import Quiz from "./routes/Quiz.svelte";
import Navbar from "./components/Navbar.svelte";

let routes = {
  "/": Home,
  "/quiz": Quiz,
}
</script>
<svelte:head>
	<title>Synth Quiz</title>
	<html lang="en" />
</svelte:head>
<Navbar />
<Router {routes} />