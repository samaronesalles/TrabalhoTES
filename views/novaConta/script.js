let usuarios = []

onload = () => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'))

    if (usuariosSalvos)
        usuarios = usuariosSalvos
}


// Senha
document.getElementById('olhoSenha').addEventListener('mousedown', function () {
    document.getElementById('senha').type = 'text';
});

document.getElementById('olhoSenha').addEventListener('mouseup', function () {
    document.getElementById('senha').type = 'password';
});

document.getElementById('olhoSenha').addEventListener('mousemove', function () {
    document.getElementById('senha').type = 'password';
});

// Confirmação de senha
document.getElementById('olhoConfirmacao').addEventListener('mousedown', function () {
    document.getElementById('senhaConfirmacao').type = 'text';
});

document.getElementById('olhoConfirmacao').addEventListener('mouseup', function () {
    document.getElementById('senhaConfirmacao').type = 'password';
});

document.getElementById('olhoConfirmacao').addEventListener('mousemove', function () {
    document.getElementById('senhaConfirmacao').type = 'password';
});


async function dadosValidos(user) {
    if ((user.nome.trim() === '') || (user.nome.length < 5)) {
        alert("Nome do usuário deve ter no mínimo 5 caracteres")
        document.getElementById('nome').focus()
        return false
    }

    if (user.email.indexOf("@") == -1 || user.email.indexOf(".") == -1 || user.email == "" || user.email == null) {
        alert("Por favor, indique um e-mail válido.");
        document.getElementById('email').focus()
        return false;
    }

    if ((user.senha.trim() === '') || (user.senha.length < 8)) {
        alert("A senha do usuário deve ter no mínimo 8 caracteres")
        document.getElementById('senha').focus()
        return false
    }

    if (user.senha !== user.senhaConfirmacao) {
        alert("A senha e a confirmação da senha não são iguais")
        document.getElementById('senha').focus()
        return false
    }

    if (user.dataNascimento === "") {
        alert("A Data de nascimento é obrigatória")
        document.getElementById('dataNascimento').focus()
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

    // Fechando tela modal - Como os dados estarão gravados, basta dar refresh no parent...'
    parent.location.reload();

});

navigator.serviceWorker.register('./users-sw.js');