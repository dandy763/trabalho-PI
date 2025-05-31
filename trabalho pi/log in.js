
const DB_KEY = 'usuarios_db';


document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = value;
});

document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
});


function getUsuarios() {
    return JSON.parse(localStorage.getItem(DB_KEY)) || { usuarios: [] };
}

function salvarUsuario(usuario) {
    const db = getUsuarios();
    
    if (db.usuarios.some(u => u.email === usuario.email)) {
        throw new Error('Email já cadastrado!');
    }
    
    db.usuarios.push(usuario);
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Formulário
document.getElementById('cadastro-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        telefone: document.getElementById('telefone').value,
        cep: document.getElementById('cep').value,
        numero: document.getElementById('numero').value,
        dataCadastro: new Date().toISOString()
    };

    try {
        salvarUsuario(usuario);
        alert('Cadastro realizado com sucesso!');
        this.reset(); 
    } catch (error) {
        alert(error.message);
    }
});

// Botão Cancelar
document.querySelector('.btn-cancel').addEventListener('click', function() {
    if (confirm('Deseja cancelar o cadastro?')) {
        document.getElementById('cadastro-form').reset();
    }
});