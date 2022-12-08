<script>
    import { character } from "../store/stores";
    export let { hp } = character;
    export let infosVisible = false;

    function showInfos() {
        infosVisible = true;
    }

    function hideInfos() {
        infosVisible = false;
    }
</script>

<div class="Character" on:mouseenter={showInfos} on:mouseleave={hideInfos}>
    <div>Player</div>
    {#if $character.alive}
        <div>{$character.hp}</div>
    {:else}
        DEAD
    {/if}

    {#if infosVisible}
        <div class="CharacterInfos">
            <div>{$character.name}</div>
            <div>HP: {$character.hp} / {$character.baseHp}</div>
            {#each $character.explored as item}
                <span>{item}</span> {$character.explored.length > 1 ? "-" : ""}
            {/each}
        </div>
    {/if}
</div>

<style>
    .Character {
        height: 100px;
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(59, 91, 91);
        font-size: 12px;
        position: relative;
    }
    .CharacterInfos {
        position: absolute;
        top: 80%;
        left: 80%;
        background-color: black;
        min-width: 200px;
    }
</style>
