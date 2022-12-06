<script>
    import { character } from "../store/stores";

    export let isFighting = false;
    export let enemy;
    export let win,
        lose = (atk) => {};

    $: enemy && $character.hp >= $character.hp - enemy.encounter.atk
        ? () => {
              win();
          }
        : () => {
              lose();
              console.log(enemy);
          };
</script>

{#if isFighting && enemy}
    <div class="Backdrop" />
    <div class="Fight">
        <h3>
            You are in a fight with {enemy.encounter.name}
        </h3>
        <p>but at what cost ?</p>
        <p>you took {enemy.encounter.atk} damage</p>
        <div class="FightActions">
            <button on:click|preventDefault={lose}>Lose</button>
            <button on:click|preventDefault={win}>Win</button>
        </div>
    </div>
{/if}

<style>
    .Backdrop {
        position: fixed;
        inset: 0;
        background-color: black;
        opacity: 0.5;
        height: 100%;
        width: 100%;
        z-index: 100;
    }

    .Fight {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: black;
        transform: translate(-50%, -50%);
        z-index: 1000;
        padding: 1rem;
    }
    .FightActions {
        display: flex;
        justify-content: space-between;
    }
</style>
