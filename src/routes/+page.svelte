<script>
    import Row from './Row.svelte';
    import Stats from './Stats.svelte';
    import Definition from './Definition.svelte';
    import { word, playing, won } from '../stores';
    export let data;
    $word = data.data;
    console.log($word);
    let guess = '';
    let guesses = ['', '', '', '', '', ''];
    let currentGuess = 0;
    function handleKeydown(e) {
        if($playing && /^[A-Za-z]$/.test(e.key) && guess.length < 5) {
            guess += e.key.toUpperCase();
            guesses[currentGuess] = guess;
        }
        if($playing && e.key === 'Enter' && guess.length === 5) submitGuess();
        if($playing && e.key === 'Backspace' && guess.length > 0) {
            guess = guess.slice(0, guess.length - 1);
            guesses[currentGuess] = guess;
        }
    }
    
    function submitGuess() {
        guesses[currentGuess] = guess;
        currentGuess++;
        if(guess === $word) {
            $playing = false;
            $won = true;
        }
        guess = '';
        $playing = $playing && currentGuess <= 5;
    }
    
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<div class="title-wrapper">
    <h1 class="title pt-serif-regular">Wordie</h1>
</div>

<Stats tries={currentGuess} />

<div class="center-flex">
    <div class="board-flex">
        {#each [0, 1, 2, 3, 4, 5] as index}
            <Row guess={guesses[index]} showColor={currentGuess > index}/>
        {/each}
    </div> 
</div>

<button class="replay-button" on:click={async () => {
    $playing = false;
    await word.newWord();
    console.log($word);
    $playing = true;
    $won = false;
    currentGuess = 0;
    guesses = ['', '', '', '', '', ''];
    guess = ''; 
}}>Play Again!</button>

<Definition />

<style>
    :global(*) {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

    }
    :global(body) {
        font-family: 'PT Serif', serif;
        background: #353333;
        color: rgb(234, 221, 221);
    }

    .replay-button {
        width: 260px;
        height: 75px;
        position: absolute;
        top: calc(100% - ((50% - 312px) / 2) - 37px);
        left: calc(50% - 130px);
        background-color: #868282;/* #4a4848; */
        border: 2px solid rgb(193, 182, 182);
        font-family: 'PT Serif', serif;
        color: #353333;
        font-size: 24px;
        font-weight: bold;
        border-radius: 5px;
    }

    .replay-button:hover {
        background-color: rgb(234, 221, 221);/*#e9d1d1;*/
        color: rgb(72, 68, 68);
        /* border: 2px solid rgb(35, 34, 34); */
    }

    .board-flex {
        display: flex;
        flex-direction: column;
        width: 520px;
        height: 625px;
        justify-content: space-between;
        align-items: center;
    }

    .center-flex {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title-wrapper {
        position: absolute;
        width: 100%;
        height: calc(50% - 312px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 128px;
       
        width: 100%;
        text-align: center;
        position: absolute;
        align-items: center;
    }
</style>