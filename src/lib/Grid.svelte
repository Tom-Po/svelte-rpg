<script>
    import ArrowKeys from "../constants/keys";
    import { character } from "../store/stores";

    export let locked = false;

    export let triggerFight = (encounter) => {
        console.log("A fight has been triggered", encounter);
    };

    export let events = [];

    let tiles,
        eventTiles = [];
    let tilesCount = 20;
    let rowSize = tilesCount / 5;

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function setActiveTile(value) {
        if (locked) return;
        if (value > tilesCount - 1 || value < 0) value = $character.position;
        if (eventTiles.includes(value))
            character.setRefPosition($character.position);
        character.move(value);
    }

    function moveLeft() {
        if ($character.position % rowSize === 0) return;
        setActiveTile($character.position - 1);
    }

    function moveRight() {
        if ($character.position % rowSize === 3) return;
        setActiveTile($character.position + 1);
    }

    function moveDown() {
        setActiveTile($character.position + rowSize);
    }

    function moveUp() {
        setActiveTile($character.position - rowSize);
    }

    function onKeyDown({ keyCode }) {
        switch (keyCode) {
            case ArrowKeys.left:
                moveLeft();
                break;
            case ArrowKeys.right:
                moveRight();
                break;
            case ArrowKeys.down:
                moveDown();
                break;
            case ArrowKeys.up:
                moveUp();
                break;
        }
    }
    $: {
        eventTiles = events.map((e) => e.id);
        tiles = Array(tilesCount)
            .fill()
            .map((_, id) => {
                const eventId = events.findIndex((e) => e.id === id);
                return {
                    id,
                    encounter: eventId !== -1 ? events[eventId].encounter : [],
                    visited: $character.explored.includes(id),
                    active: $character.position === id,
                    event: eventId !== -1,
                };
            });
    }

    $: if (eventTiles.includes($character.position)) {
        const encounterIndex = events.findIndex(
            (i) => i.id === $character.position
        );
        triggerFight(events[encounterIndex]);
    }
</script>

<svelte:window on:keydown={onKeyDown} />
<div class="Grid" style="--width: {16}">
    {#each tiles as { visited, active, event }, idx}
        <div
            class="GridItem"
            class:visited={visited && !event}
            class:active
            class:event
        >
            {#if idx === $character.position}
                <slot />
            {:else if event}
                <div>Mob</div>
            {:else}
                <!-- else content here -->
            {/if}
        </div>
    {/each}
</div>

<style>
    .Grid {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: calc(var(--width) * 40px);
    }

    .GridItem {
        flex-basis: 20%;
        height: 100px;
        background-color: rgb(9, 13, 16);
        border: 1px solid rgb(51, 51, 51);
    }
    .GridItem.active {
        background-color: blueviolet;
    }

    .GridItem.event {
        background-color: orangered;
    }
    .GridItem.visited {
        background-color: rgb(107, 107, 55);
    }
</style>
