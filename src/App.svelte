<script>
  import Character from "./lib/Character.svelte";
  import Fight from "./lib/Fight.svelte";
  import Grid from "./lib/Grid.svelte";
  import Menu from "./lib/Menu.svelte";
  import { character } from "./store/stores";
  import { events } from "./store/mobs";

  let enemy = {
    position: 2,
    encounter: {
      name: "Trashmob",
      hp: 100,
      atk: 20,
    },
  };
  let isFighting = false;
  let winCount = 0;

  function triggerFight(encounter) {
    isFighting = true;
    enemy = encounter;
  }

  function end() {
    isFighting = false;
  }

  function removeEnemy() {
    events.removeEvent(enemy);
  }

  function win() {
    character.takeDamage(enemy.encounter.atk);
    winCount += 1;
    removeEnemy();
    end();
  }

  function lose() {
    character.takeDamage(enemy.encounter.atk);
    character.move($character.oldPosition);
    winCount -= 1;
    end();
  }

  function reset() {
    events.reset();
    character.reset();
  }

  $: youWon = $events.length === 0 && $character.alive;
  $: locked = isFighting || !$character.alive || youWon;
</script>

<main>
  <div>Win count: {winCount}</div>
  <Fight {isFighting} {win} {lose} {enemy} />
  <Grid {triggerFight} {locked} events={$events}>
    <Character />
  </Grid>
  <Menu />
  {#if youWon || !$character.alive}
    <h1>{youWon ? "Victory" : "Defeat"}</h1>
  {/if}
  <button on:click={reset}>Reset</button>
</main>

<style>
  button {
    padding: 0.5rem 1rem;
    background-color: orangered;
    border: none;
    outline: none;
    color: white;
  }
</style>
