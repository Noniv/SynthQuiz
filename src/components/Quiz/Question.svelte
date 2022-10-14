<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  let countdown = 10;
  let timeEnded = false;
  let timeStarted = false;
  let answer = "";
  export let song;

  const dispatch = createEventDispatcher();

  const loadAudio = () => {
    let audio = new Audio(song.src);
    audio.addEventListener("loadeddata", () => {
      if (audio.readyState == 4) {
        audio.play();
        handleStart();
      }
    });
  };

  const handleStart = () => {
    timeStarted = true;
    const intervalId = setInterval(function () {
      if (countdown > 0) countdown--;
      else {
        timeEnded = true;
        clearInterval(intervalId);
      }
    }, 1000);

    dispatch("questionStart");
  };

  const handleHumanClick = () => {
    answer = "human";
    checkAnswer();
  };

  const handleSynthesisedClick = () => {
    answer = "synthesised";
    checkAnswer();
  };

  const checkAnswer = () => {
    if (answer === song.answer) dispatch("correctAnswer");
    else dispatch("wrongAnswer");
  };
</script>

{#if timeStarted && !timeEnded}
  <div class="countdown" in:fade>
    <div class="countdown-number">{countdown}</div>
    <svg>
      <circle r="36" cx="40" cy="40" />
    </svg>
  </div>
{:else if !timeEnded}
  <button
    in:fade
    on:click={loadAudio}
    class="text-white hover:text-white bg-lime-600 rounded-full py-3 px-6 w-fit block hover:scale-105 transition-transform mx-auto"
    >Click to play the song</button
  >
{/if}
{#if timeEnded}
  <h1 class="text-5xl mb-4" in:fade>The voice is:</h1>
  <div class="flex justify-center gap-4" in:fade>
    <button
      class="text-white hover:text-white bg-lime-600 rounded-full py-3 px-6 w-fit block hover:scale-105 transition-transform"
      on:click={handleHumanClick}>Human</button
    >
    <button
      class="text-white hover:text-white bg-lime-600 rounded-full py-3 px-6 w-fit block hover:scale-105 transition-transform"
      on:click={handleSynthesisedClick}>Synthesised</button
    >
  </div>
{/if}
{#if timeStarted}
  <div class="max-w-sm mx-auto absolute bottom-0 left-0 right-0" in:fade>
    Source: <a href={song.credit}>{song.credit}</a>
  </div>
{/if}

<style>
  .countdown {
    position: relative;
    margin: auto;
    height: 80px;
    width: 80px;
    text-align: center;
  }

  .countdown-number {
    color: white;
    display: inline-block;
    line-height: 80px;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    transform: rotateY(-180deg) rotateZ(-90deg);
  }

  svg circle {
    stroke-dasharray: 236px;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    stroke-width: 2px;
    stroke: white;
    fill: none;
    animation: countdown 10s linear 1 forwards;
  }

  @keyframes countdown {
    from {
      stroke-dashoffset: 0px;
    }
    to {
      stroke-dashoffset: 236px;
    }
  }
</style>
