<script>
    import { playing, won } from '../stores.js';
    export let tries;
</script>
<div class="stats-container">
    {#if !$playing}
        {#if $won}
            <h1 class="stats-text">Congratulations!<br>You guessed the word in {tries} {tries === 1 ? 'try' : 'tries'}!</h1>
        {:else}
            <h1 class="stats-text">Valiant effort.<br>Better luck next time!</h1>
        {/if}
    {/if}
</div>

<style>
    .stats-container {
        position: absolute;
        width: calc(50% - 260px);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5% 0 5%;
    }
    .stats-text {
        text-align: center;
    }
</style>