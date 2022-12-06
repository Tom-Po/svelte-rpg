<script>
    let showGoals = false;

    function onKeyDown({ keyCode }) {
        switch (keyCode) {
            case 32:
                showGoals = !showGoals;
                break;
        }
    }
</script>

{#if showGoals}
    <div class="Goals">
        <h5>Making a game</h5>
        <ul>
            <li>Moving monsters</li>
            <li>Functionnal programming</li>
            <li>Composition</li>
            <li>Create monster fight outcome</li>
            <li>Make events abstract</li>
        </ul>
    </div>
{/if}

<svelte:window on:keydown={onKeyDown} />

<style>
    .Goals {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: rgb(57, 57, 57);
    }
</style>
