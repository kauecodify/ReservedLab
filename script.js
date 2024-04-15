function inicio() {
    alert("Bem-vindo ao Hotel ReservedLab!");

    let nomeHotel = "ReservedLab";

	window.onload = inicio;
	
    let opcao = prompt("Escolha uma opção: \n1 - acessar sistema \n2 - Sair");
    switch (opcao) {
        case "1":
            let nomeUsuario = prompt("Por favor, insira seu nome:");
            let senha = prompt("Por favor, insira sua senha:");

            if (senha === "2678") {
                acessarSistema(nomeHotel, nomeUsuario);
            } else {
                alert("Senha incorreta. Por favor, tente novamente.");
                inicio();
            }
            break;

        case "2":
            alert("Até breve!");
            break;

        default:
            alert("Opção inválida!");
            inicio();
            break;
    }
}

//----------------------------------------------------------------------------------------------------------------\\


//grid-reservas----------------------------------------------------------------------------------------------------\\
let quartos = Array(20).fill(false);

function criarGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    quartos.forEach((status, index) => {
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('room');
        if (status) {
            roomDiv.classList.add('occupied');
        }
        roomDiv.textContent = `Quarto ${index + 1}`;
        roomDiv.addEventListener('click', () => reservarQuarto(index + 1, roomDiv));
        gridContainer.appendChild(roomDiv);
    });
}
//-----------------------------------------------------------------------------------------------------------------\\


//criar quartos-----------------------------------------------------------------------------------------------------\\
function acessarSistema(nomeHotel, nomeUsuario) {
    alert("Bem-vindo, " + nomeUsuario + "! É um imenso prazer ter você no " + nomeHotel);

    let quartos = criarQuartos();

    let numeroQuarto = prompt("Por favor, escolha o número do quarto (1-20):");
    if (numeroQuarto >= 1 && numeroQuarto <= 20) {
        alert("Você selecionou o " + quartos[numeroQuarto - 1]);
    } else {
        alert("Número do quarto inválido.");
    }

    window.addEventListener("beforeunload", function() {
        despedida(nomeUsuario);
    });
}

function criarQuartos() {

    let quartos = [];
    
    for (let i = 1; i <= 20; i++) {
        let nomeQuarto = "quarto" + i;
        quartos.push(nomeQuarto);
    }

    return quartos;
}

function despedida(nomeUsuario) {
    alert("Muito obrigado e até logo, " + nomeUsuario + ".");
}
//------------------------------------------------------------------------------------------------------------------\\


//cadastro de usuários-----------------------------------------------------------------------------------------------\\
function iniciarCadastroHospedes() {
    let diaria = validarDiaria();
    let { gratuidades, meias, total } = cadastrarHospedes(diaria);

    alert(`O valor total das hospedagens é: R$${total.toFixed(2)}; ${gratuidades} gratuidade(s); ${meias} meia(s).`);
}

function cadastrarEPesquisarHospedes() {
    let listaHospedes = [];

    while (true) {
        let opcaoCadastro = prompt("Deseja cadastrar um novo hóspede? (S/N)").toUpperCase();
        if (opcaoCadastro !== "S") break;

        let nomeHospede = prompt("Qual o nome do hóspede?");
        let idadeHospede = parseInt(prompt("Qual a idade do hóspede?"));

        listaHospedes.push({ nome: nomeHospede, idade: idadeHospede });
        alert(`${nomeHospede} cadastrado com sucesso.`);
    }

    let nomePesquisa = prompt("Digite o nome do hóspede para pesquisar:");
    let encontrado = false;

    for (let hospede of listaHospedes) {
        if (hospede.nome.toLowerCase() === nomePesquisa.toLowerCase()) {
            alert(`Hóspede encontrado: Nome: ${hospede.nome}, Idade: ${hospede.idade}`);
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        alert("Hóspede não encontrado.");
    }
}
//-----------------------------------------------------------------------------------------------------------------\\


//Agendar eventos--------------------------------------------------------------------------------------------------\\
function AgendamentodeEventos() {
    let numConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));
    verificarAuditório(numConvidados);

    if (numConvidados <= 350 && numConvidados >= 0) {
        let diaSemana = prompt("Qual o dia do seu evento?");
        let hora = parseInt(prompt("Qual a hora do seu evento?"));
        verificarDisponibilidadeAuditório(diaSemana, hora);

        let totalHorasEvento = parseInt(prompt("Qual a duração do evento em horas?"));
        let custoGarçons = calcularGarçons(numConvidados, totalHorasEvento);
        let custoBuffet = calcularBuffet(numConvidados);

        exibirRelatorio(numConvidados, totalHorasEvento, custoGarçons, custoBuffet);
    }
}

function verificarAuditório(numConvidados) {
    if (numConvidados > 350 || numConvidados < 0) {
        alert("Número de convidados inválido.");
        return;
    }

    if (numConvidados <= 220) {
        let cadeirasAdicionais = Math.min(70, 220 - numConvidados);
        alert(`Use o auditório Laranja (inclua mais ${cadeirasAdicionais} cadeiras)`);
    } else {
        alert("Use o auditório Colorado");
    }
}

function verificarDisponibilidadeAuditório(diaSemana, hora) {
    if (
        (diaSemana === "segunda" || diaSemana === "terca" || diaSemana === "quarta" || diaSemana === "quinta" || diaSemana === "sexta") &&
		function verificarDisponibilidadeAuditório(diaSemana, hora) {
    if (
        (diaSemana === "segunda" || diaSemana === "terca" || diaSemana === "quarta" || diaSemana === "quinta" || diaSemana === "sexta") &&
        (hora >= 7 && hora <= 23)
    ) {
        let nomeEmpresa = prompt("Qual o nome da empresa?");
        alert(`Auditório reservado para ${nomeEmpresa}: ${diaSemana} às ${hora}hs.`);
    } else if (
        (diaSemana === "sabado" || diaSemana === "domingo") &&
        (hora >= 7 && hora <= 15)
    ) {
        let nomeEmpresa = prompt("Qual o nome da empresa?");
        alert(`Auditório reservado para ${nomeEmpresa}: ${diaSemana} às ${hora}hs.`);
    } else {
        alert("Auditório indisponível.");
    }
}

let numConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));
let totalHorasEvento = parseInt(prompt("Qual a duração do evento em horas?"));
let garçons = 0;

for (let i = 0; i < numConvidados; i += 12) {
    garçons++;
}

for (let i = 0; i < totalHorasEvento; i += 2) {
    garçons++;
}

let custo = garçons * 10.50;
alert(`São necessários ${garçons} garçons.`);
alert(`Custo: R$${custo.toFixed(2)}`);


function calcularBuffet(numConvidados) {
    let cafe = numConvidados * 0.2;
    let agua = numConvidados * 0.5;
    let salgados = numConvidados * 7;
    let custoCafe = cafe * 0.80;
    let custoAgua = agua * 0.40;
    let custoSalgados = (salgados / 100) * 34;
    let custoTotalBuffet = custoCafe + custoAgua + custoSalgados;

    alert(`O evento precisará de ${cafe.toFixed(2)} litros de café, ${agua.toFixed(2)} litros de água, ${salgados} salgados.`);
    alert(`Custo do Buffet: R$${custoTotalBuffet.toFixed(2)}`);
    return custoTotalBuffet;
}

function exibirRelatorio(numConvidados, totalHorasEvento, custoGarçons, custoBuffet) {
    let valorTotalEvento = custoGarçons + custoBuffet;

    alert(`Evento no Auditório Colorado.`);
    let nomeEmpresa = prompt("Nome da Empresa:");
    let diaSemana = prompt("Data:");
    let horaEvento = prompt("Horário:");

    alert(`Nome da Empresa: ${nomeEmpresa}`);
    alert(`Data: ${diaSemana}, ${horaEvento}H.`);
    alert(`Duração do evento: ${totalHorasEvento}H.`);
    alert(`Quantidade de garçons: ${Math.ceil(numConvidados / 12) + Math.ceil(totalHorasEvento / 2)}.`);
    alert(`Quantidade de Convidados: ${numConvidados}`);
    alert(`Custo do Garçons: R$${custoGarçons.toFixed(2)}`);
    alert(`Custo do Buffet: R$${custoBuffet.toFixed(2)}`);
    alert(`Valor total do Evento: R$${valorTotalEvento.toFixed(2)}`);

    let resposta = prompt("Gostaria de efetuar a reserva? S/N");
    if (resposta.toUpperCase() === "S") {
        alert("Reserva efetuada com sucesso.");
    } else {
        alert("Reserva não efetuada.");
    }
}
//-----------------------------------------------------------------------------------------------------------------\\

    
//combustível------------------------------------------------------------------------------------------------------\\
function compararPrecosCombustivel() {
    let gasolina = parseFloat(prompt("Qual o preço da gasolina por litro?"));
    let alcool = parseFloat(prompt("Qual o preço do álcool por litro?"));
    let etanol = parseFloat(prompt("Qual o preço do etanol por litro?"));
    let precoEnergia = parseFloat(prompt("Qual o preço da energia por carregamento?"));

    let precos = {
        "Gasolina": gasolina,
        "Álcool": alcool,
        "Etanol": etanol,
        "Energia (carregamento)": precoEnergia
    };

    let combustivelMaisBarato = Object.keys(precos).reduce((a, b) => precos[a] < precos[b] ? a : b);
    let precoMaisBarato = precos[combustivelMaisBarato];

    alert(`O preço mais barato é do ${combustivelMaisBarato}, no valor de R$ ${precoMaisBarato.toFixed(2)} por litro ou carregamento.`);
}

compararPrecosCombustivel();

//------------------------------------------------------------------------------------------------------------------\\

    
//Ar-codicionado----------------------------------------------------------------------------------------------------\\
function orcamentoManutencaoArCondicionado(numUnidades, tipoServico) {
    let custoTotal = 0;

    const custoPorServico = {
        "Limpeza geral": 100,
        "Reparo de peças": 200,
        "Recarga de gás": 150
    };

    for (let servico in tipoServico) {
        if (custoPorServico.hasOwnProperty(servico)) {
            custoTotal += custoPorServico[servico] * tipoServico[servico];
        }
    }


    custoTotal *= numUnidades;

    return custoTotal;
}

let numUnidades = parseInt(prompt("Quantas unidades de ar condicionado precisam de manutenção?"));
let tipoServico = {};

tipoServico["Limpeza geral"] = parseInt(prompt("Quantas unidades precisam de limpeza geral?"));
tipoServico["Reparo de peças"] = parseInt(prompt("Quantas unidades precisam de reparo de peças?"));
tipoServico["Recarga de gás"] = parseInt(prompt("Quantas unidades precisam de recarga de gás?"));

let custoTotalManutencao = orcamentoManutencaoArCondicionado(numUnidades, tipoServico);
alert(`O custo total da manutenção do ar condicionado é de R$${custoTotalManutencao.toFixed(2)}.`);

//------------------------------------------------------------------------------------------------------------------\\

    
//Switch inicial----------------------------------------------------------------------------------------------------\\ 
    function iniciarPrograma() {
    let gratuidades = 0;
    let meias = 0;

    while (true) {
    let opcao = prompt("1) Reservar quartos\n2) Cadastro de hóspedes\n3) Cadastro e pesquisa de hóspedes\n4) Agendamento de eventos\n5) Comparar preços de combustível\n6) Orçamento de manutenção de ar-condicionado\n7) Sair\nEscolha uma opção:");
    switch (opcao) {
            case "1":
                criarGrid();
                return;

            case "2":
                let nomeHospede = prompt("Qual o nome do hóspede?");
                let idade = parseInt(prompt(`Qual a idade de ${nomeHospede}?`));
                let custoDiaria = 100;

                switch (true) {
                    case idade < 6:
                        alert(`${nomeHospede} possui gratuidade.`);
                        gratuidades++;
                        custoDiaria = 0;
                        break;
                    case idade > 60:
                        alert(`${nomeHospede} paga meia.`);
                        meias++;
                        custoDiaria /= 2;
                        break;
                }
        
                break;

            case "3":
                cadastrarEPesquisarHospedes();
                break;

            case "4":
                AgendamentodeEventos();
                break;

            case "5":
                compararPrecosCombustivel();
                break;

            case "6":
                orcamentoManutencaoArCondicionado();
                break;

            case "7":
                alert("Saindo...");
                return;

            default:
                alert("Opção inválida. Tente novamente.");
        }
    }
}

iniciarPrograma();

//-------------------------------------------------------------------------------------------------------------------\\
