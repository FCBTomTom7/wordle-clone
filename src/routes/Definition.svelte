<script async>
    import { playing, word } from '../stores.js';
</script>


<div class="definition-container">
    {#if !$playing}
        {#await word.getDefinition($word)}
        <h1 class="definition-text">{$word.charAt(0) + $word.slice(1, $word.length).toLowerCase()} - loading definition</h1>
        {:then wordData}
        <h1 class="definition-text">{$word.charAt(0) + $word.slice(1, $word.length).toLowerCase()} - {wordData[0].meanings[0].definitions[0].definition}</h1>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
        
    {/if}
</div>

<style>
    .definition-container {
        position: absolute;
        width: calc(50% - 260px);
        left: calc(50% + 260px);
        top: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 5% 0 5%;
    }
</style>