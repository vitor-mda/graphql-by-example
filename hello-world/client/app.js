const GRAPHQL_URL = 'http://localhost:9000/';
const element = document.getElementById('greeting');

fetchGreeting().then(greeting => {
    element.textContent = greeting;
})

async function fetchGreeting() {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query {
                    greeting
                }
            `
        })
    });
    const { data } = await response.json();
    return data.greeting;
}
