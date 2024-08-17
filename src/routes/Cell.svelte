<script>
    export let letter = '';
    export let color = '';
</script>

<div class="cell-frame" style="{color}">
    <p class="cell-letter">{letter}</p>
</div>

<style>
    .cell-frame {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100px;
        height: 100px;
        padding: 0;
        margin: 0;
        border-radius: 5px;
    }

    .cell-letter {
        font-size: 64px;
    }
</style>