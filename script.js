function inicio() {
    alert("Bem-vindo ao Hotel ReservedLab!");

    let nomeHotel = "ReservedLab";

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

window.onload = inicio;
