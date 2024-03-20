function criarCalendario() {
    const calendarioElement = document.getElementById("calendario");

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();

    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);

    const tabelaCalendario = document.createElement("table");
    const cabecalho = tabelaCalendario.createTHead();
    const corpoTabela = tabelaCalendario.createTBody();

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const linhaCabecalho = cabecalho.insertRow();
    diasSemana.forEach(dia => {
        const celula = linhaCabecalho.insertCell();
        celula.textContent = dia;
    });


    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0).getDate();


    let diaAtual = 1;
    for (let i = 0; i < 6; i++) { 
        const linha = corpoTabela.insertRow();
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < primeiroDiaMes.getDay()) {
               
                linha.insertCell();
            } else if (diaAtual <= ultimoDiaMes) {
                const celula = linha.insertCell();
                celula.textContent = diaAtual;
                diaAtual++;
              
                celula.addEventListener("click", function() {
                   
                    const confirmacao = confirm("Deseja confirmar a reserva para o dia " + celula.textContent + " via WhatsApp?");
                    if (confirmacao) {
                        reservarDia(celula);
                    }
                });
            } else {
            
                linha.insertCell();
            }
        }
    }

    calendarioElement.appendChild(tabelaCalendario);
}


function reservarDia(celula) {
    celula.style.backgroundColor = "red";
    celula.innerHTML += '<button onclick="cancelarReserva(this)">Cancelar</button>'; // Adiciona um botão de cancelamento
}

function cancelarReserva(botao) {
    const celula = botao.parentNode;
    celula.style.backgroundColor = ""; 
    botao.remove();
}


window.onload = criarCalendario;

  