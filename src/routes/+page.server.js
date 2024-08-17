export async function load() {
    let response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
    let data = await response.json();
    return { data: data[0].toUpperCase() }
}