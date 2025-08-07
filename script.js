
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
	const profissao = document.getElementById("profissao").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
	const telefone2 = document.getElementById("telefone2").value;
	const nomeReferencia1 = document.getElementById("nomeReferencia1").value;
	const telefone3 = document.getElementById("telefone3").value;
	const nomeReferencia2 = document.getElementById("nomeReferencia2").value;
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
*Profissão:* ${profissao}
*Email:* ${email}
*Telefone:* ${telefone}
*Referência:* ${telefone2}
*Nome da Referência:* ${nomeReferencia1}
*Referência* ${telefone3}
*Nome da Referência:* ${nomeReferencia2}
*CPF:* ${cpf}
*Nascimento:* ${nascimento}
*Instagram:* ${instagram}
*Experiência com Vendas:* ${experiencia}

*Endereço:*
${rua}, Nº ${numero}
*Bairro:* ${bairro}
*Cidade:* ${cidade}
*Estado:* ${estado}
*CEP:* ${cep}

*Para Adiantar o processo*, nos envie uma foto do seu documento, *RG e CPF ou CNH + Comprovante de Residencia*`;

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
