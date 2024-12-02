let listaDeNumerosSorteados = [];
let numeroLimite = 10; //quantidade de numeros disponíveis sorteados
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); //rate = velocidade
}

/*
Para habilitar a fala:
1º) Script no HTML (index.html - linha 8)
2º) Na função exibirTextoNaTela(), habilitar o método responsiveVoice (app.js - linha 9)
*/

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); //atribui ao h1 a frase
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial(); //executa a função

function verificarChute() { //cria a função para verfificar os chutes:
    let chute = document.querySelector('input').value; //pega o valor digitado no campo input
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas); //atribui ao p o valor da variável mensagemTentativas

        document.getElementById('reiniciar').removeAttribute('disabled'); //pega do HTML o id chamado 'reiniciar' e remove o atributo chamado 'disabled'. Isso é feito para que o botão Reiniciar Jogo fique azul
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor');
        } else {
            exibirTextoNaTela('p', 'O número é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {//se o númeroEscolhido já está incluso no array listaDeNumerosSorteados
        return gerarNumeroAleatorio(); //pede para gerar um novo número caso o numeroEscolhido já esteja na listaDeNumerosEscolhidos -----> esse recurso se chama RECURSÃO
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //add o numeroEscolhido na listaDeNumerosSorteados
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; //o campo chute ficará vazio
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disable', true); //desabilita o atributo disable, ou seja, desativa o botão Novo Jogo. Resumindo: começamos o jogo com o botão "Novo Jogo" desabilitado. Após acertar o número da sorte ele é habilitado. Ao clicá-lo ele desabilita novamente.
}