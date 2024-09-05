(async () => {
    const response = await fetch('http://localhost:4000/session', {
        method: 'GET',
        credentials: 'include' // Importante para enviar las cookies de sesión
    })

    console.log({ response })


    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-name').innerText = data.user.username;
    } else {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'index.html';
    }
})();


// Manejar el cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Error al cerrar sesión');
    } else {
        history.replaceState(null, null, 'index.html');
        window.location.replace('index.html');
    }
});

document.querySelector('#register').addEventListener('click', async () => {

console.log('llegue aca');

try{

const response = await fetch('http://localhost:4000/register', {

    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }),
    credentials: 'include'


})

console.log(response);

if (!response.ok) {
    alert('Credenciales inválidas');
    divError.classList.add('bg-danger', 'text-white', 'text-center', 'rounded', 'p-2', 'mt-3');

    setTimeout(() => {
        divError.hidden = true;
    }, 3500);

    return;
}
}
catch{
    console.log('error');
}

})