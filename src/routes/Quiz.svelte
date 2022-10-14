<script>
  import Question from "../components/Quiz/Question.svelte";
  import songs from "../assets/songs.json";
  import { fade } from "svelte/transition";

  let questionNumber = 0;
  let points = 0;
  let answerText = "";
  let totalQuestions = 10;
  songs.sort(() => 0.5 - Math.random());

  const handleCorrectAnswer = () => {
    points++;
    questionNumber++;
    answerText = "Correct!";
  };

  const handleWrongAnswer = () => {
    questionNumber++;
    answerText = "Wrong!";
  };

  const handleQuestionStart = () => {
    answerText = "";
  };

  const filteredSongs = songs.slice(0, totalQuestions);
</script>

<h1 class="py-32">Quiz</h1>
<div class="h-40 relative">
  {#each filteredSongs as song, i (i)}
    {#if i === questionNumber}
      <Question
        {song}
        on:correctAnswer={handleCorrectAnswer}
        on:wrongAnswer={handleWrongAnswer}
        on:questionStart={handleQuestionStart}
      />
    {/if}
  {/each}
  {#if questionNumber == totalQuestions}
    <h2 class="text-3xl" in:fade>Your score: {points}/{totalQuestions}</h2>
  {/if}
</div>

<div class="flex justify-between max-w-sm mx-auto my-16 px-4" in:fade>
  <div>
    Question: {questionNumber < totalQuestions
      ? questionNumber + 1
      : totalQuestions}/{totalQuestions}
  </div>
  <div class={answerText == "Correct!" ? "text-green-500" : "text-red-500"}>
    {answerText}
  </div>
  <div>Points: {points}</div>
</div>
