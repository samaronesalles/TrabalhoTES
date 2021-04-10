let usuarios = []

onload = () => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'))

    if (usuariosSalvos)
        usuarios = usuariosSalvos
}

async function dadosValidos(user) {
    if ((user.nome.trim() === '') || (user.nome.length < 5)) {
        alert("Nome do usuário deve ter no mínimo 5 caracteres")
        return false
    }

    if (user.email.indexOf("@") == -1 || user.email.indexOf(".") == -1 || user.email == "" || user.email == null) {
        alert("Por favor, indique um e-mail válido.");
        return false;
    }

    if ((user.senha.trim() === '') || (user.senha.length < 8)) {
        alert("A senha do usuário deve ter no mínimo 8 caracteres")
        return false
    }

    if (user.senha !== user.senhaConfirmacao) {
        alert("A senha e a confirmação da senha não são iguais")
        return false
    }

    return true
}

document.getElementById('salvarUser').addEventListener('click', async function () {

    const User = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        senhaConfirmacao: document.getElementById('senhaConfirmacao').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        receberEmail: document.getElementById('receberEmail').checked
    }

    if (!await dadosValidos(User))
        return

    if (usuarios.length === 0)
        usuarios.push(User)
    else {
        const pos = usuarios.findIndex((item) => item.nome.toUpperCase() === User.nome.toUpperCase())

        if (pos < 0)
            usuarios.push(User)
        else
            usuarios[pos] = User
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios))
});

navigator.serviceWorker.register('./users-sw.js');