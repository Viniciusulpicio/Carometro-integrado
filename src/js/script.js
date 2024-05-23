const inputBola = document.getElementsByClassName("inputBola");
const turma = document.getElementsByClassName("inputTurma");

if (inputBola[0]) {
    inputBola[0].addEventListener("click", function () {
        if (inputBola[0].checked) {
            turma[1].style.display = 'block';
            turma[0].style.display = 'block';
        }
    });

    inputBola[1].addEventListener("click", function () {
        if (inputBola[1].checked) {
            turma[1].style.display = 'none';
            turma[0].style.display = 'none';
        }
    });
}

const boxTurma = document.getElementsByClassName("turma");
if (boxTurma[0]) {
    function redirectTurma($codigoTurma) {
        window.location.href = `turma.html`
    }
}

const cep = document.getElementById("cep");
if (cep) {
    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value = ("");
        document.getElementById('bairro').value = ("");
        document.getElementById('cidade').value = ("");
        document.getElementById('uf').value = ("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value = (conteudo.logradouro);
            document.getElementById('bairro').value = (conteudo.bairro);
            document.getElementById('cidade').value = (conteudo.localidade);
            document.getElementById('uf').value = (conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    function pesquisacep(valor) {
        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };
}

var formulario = document.getElementById("formAluno");
var botaoEnviar = document.getElementById("buttonSubmitAluno");
var botaoReset = document.getElementById("buttonResetAluno");
formulario.addEventListener("keydown", function () {
    botaoEnviar.disabled = false;
    botaoReset.disabled = false;
});
botaoReset.addEventListener("click", function () {
    setTimeout(() => {
        botaoEnviar.disabled = true;
        botaoReset.disabled = true;
    }, "1");
});