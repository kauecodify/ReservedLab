document.addEventListener("DOMContentLoaded", function() {
    const homeBtn = document.getElementById("homeBtn");
    const reserveBtn = document.getElementById("reserveBtn");
    const contatosBtn = document.getElementById("contatosBtn");

    const homeSection = document.getElementById("home");
    const localSection = document.getElementById("local");
    const aventuraSection = document.getElementById("aventura");
    const mundoSection = document.getElementById("mundo");

    homeBtn.addEventListener("click", function() {
        scrollToSection(homeSection);
    });

    reserveBtn.addEventListener("click", function() {
        scrollToSection(localSection);
    });

    contatosBtn.addEventListener("click", function() {
        scrollToSection(mundoSection);
    });

    function scrollToSection(section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: "smooth"
        });
    }
});

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

    window.addEventListener("beforeunload", function() {
        despedida(nomeUsuario);
    });
}

function despedida(nomeUsuario) {
    alert("Muito obrigado e até logo, " + nomeUsuario + ".");
}

window.onload = inicio;
