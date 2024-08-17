<script>
    import Cell from './Cell.svelte';
    import { word } from '../stores';
    export let guess = ''; 
    export let showColor = false; 
    let grey = "#868282"; 
    let yellow = "#dfe14d";
    let green = "#78c356";
    function resolveColor(index) {
        // if(guess.length < 5) return 'background-color: grey';
        if($word.charAt(index) === guess.charAt(index)) return 'background-color: ' + green;
        if(guess.charAt(index) && $word.includes(guess.charAt(index))) {
            let total = 0;
            let amountCovered = 0;
            let char = guess.charAt(index);
            for(let i = 0; i < $word.length; i++) {
                if($word.charAt(i) === char) {
                    total++;
                    if(guess.charAt(i) === char) amountCovered++;
                }
            }
            if(amountCovered < total) {
                return 'background-color: ' + yellow;
            }
        }
        return 'background-color: ' + grey;
    }
    $: colors = [0, 1, 2, 3, 4].map(index => resolveColor(index, guess)); // passing in guess to update var
</script>
<div class="row-flex">
    {#each [0, 1, 2, 3 ,4] as index}
        <Cell letter={guess.charAt(index) ?? ''} color={showColor ? colors[index] : 'background-color: ' + grey} />
    {/each}
</div>

<style>
    .row-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 520px;
        height: 100px;
        padding: 0;
        margin: 0;
    }
</style>
