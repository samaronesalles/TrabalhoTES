
async function dadosValidos(nome, senha) {

    if (nome.trim() === '') {
        alert("Informe o nome do usuário")
        document.getElementById('nome').focus()
        return false
    }

    if (senha.trim() === '') {
        alert("Informe a senha do usuário")
        document.getElementById('senha').focus()
        return false
    }

    return true
}

function informUsuarioInvalido() {
    alert("Usuário ou senha inválidos")
    document.getElementById('nome').focus()
}

document.getElementById('logar').addEventListener('click', async function () {

    const nome = document.getElementById('nome').value
    const senha = document.getElementById('senha').value

    if (!await dadosValidos(nome, senha))
        return

    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'))

    if (!usuariosSalvos) {
        informUsuarioInvalido()
        return
    }

    const pos = usuariosSalvos.findIndex((item) => (item.nome.toUpperCase() === nome.toUpperCase() && (item.senha.toUpperCase() === senha.toUpperCase())))

    if (pos >= 0) {
        window.location.replace("../match/macth.html");
    } else {
        informUsuarioInvalido()
        return
    }

});