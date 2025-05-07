
// Animar elementos ao rolar
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => observer.observe(el));

// Busca CEP automática
document.getElementById("cep").addEventListener("blur", function () {
    const cep = this.value.replace(/[^0-9]/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById("rua").value = data.logradouro || "";
                document.getElementById("bairro").value = data.bairro || "";
                document.getElementById("cidade").value = data.localidade || "";
                document.getElementById("estado").value = data.uf || "";
            }
        });
});


// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if (cpf === "" || cpf.length !== 11) return false;
    if (/^(\d)+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

document.getElementById("cpf").addEventListener("blur", function () {
    const erro = document.getElementById("cpfErro");
    if (!validarCPF(this.value)) {
        erro.textContent = "CPF inválido!";
    } else {
        erro.textContent = "";
    }
});

// Envio para WhatsApp
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
    const nascimento = document.getElementById("nascimento").value;
    const instagram = document.getElementById("instagram").value;
    const cep = document.getElementById("cep").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const experiencia = document.querySelector('input[name="experiencia"]:checked')?.value || 'Não informado';
	const estado = document.getElementById("estado").value;


    const msg = 
` *Quero ser consultora Kalita Tudisco!*

*Nome:* ${nome}
*Email:* ${email}
*Telefone:* ${telefone}
*CPF:* ${cpf}
*Nascimento:* ${nascimento}
*Instagram:* ${instagram}
*Experiência com Vendas:* ${experiencia}

*Endereço:*
${rua}, Nº ${numero}
*Bairro:* ${bairro}
*Cidade:* ${cidade}
*Estado:* ${estado}
*CEP:* ${cep}`;

    window.open(`https://wa.me/5543991036531?text=${encodeURIComponent(msg)}`, "_blank");
});





document.getElementById('nascimento').addEventListener('input', function (e) {
  let input = e.target;
  input.value = input.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4}).*/, '$1');
});
