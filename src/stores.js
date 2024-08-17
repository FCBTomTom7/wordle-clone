import { writable } from 'svelte/store';
const apiEndpoint = 'https://random-word-api.vercel.app/api?words=1&length=5';

async function createWordStore() {
    let { subscribe, set, update } = writable('');
    let newWord = async () => {
        let response = await fetch(apiEndpoint);
        let w = await response.json();
        set(w[0].toUpperCase()); 
    }

    let getDefinition = async (w) => {
        let response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + w);
        let data = await response.json();
        return data;
    }

    return {
        subscribe,
        set,
        update,
        newWord,
        getDefinition
    }
}

export const word = await createWordStore();
export const playing = writable(true);
export const won = writable(false);