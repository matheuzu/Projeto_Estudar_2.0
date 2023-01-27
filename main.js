class Quadro {
    constructor() {
        this.quadro = document.querySelector('#quadro');
        this.slots = Array();
        this.slotsTempo = Array();
        this.tempo = 0;
        this.posicaoTempo = 1;
        this.cronometro = 0;
        this.porcentagem = 0;
    }

    adicionarBloco(bloco) { /* Adicionar o campo de revisão */
        this.quadro.innerHTML += `        
        <div id="slot_${this.slots.length == 0 ? 1 : this.slots.length + 1}" class="bloco" onclick="editarBloco()">
            <h3 class="titulo">${bloco.titulo}</h3>
            <span class="tempo">${bloco.tempo}</span>
            <img src="imagens/marcador_${bloco.marcador}.png" class="marcador ${bloco.marcador}}">
        <div class="anotacao">
            <p>${bloco.anotacao}</p>
        </div>
        <div class="revisao">
        </div>`
        let blocoAtual = document.querySelector(`#slot_${this.slots.length == 0 ? 1 : this.slots.length + 1}`)
        this.slots.push(blocoAtual)
    }

    adicionarDescanco() {
        this.quadro.innerHTML += `
        <div id="slot_${this.slots.length == 0 ? 1 : this.slots.length + 1}" class="descanco">
            <div id="descanco_relogio">
                <img src="imagens/tempo.png" alt="">
            </div>  
            <div id="descancoTexto">
                <input type="text" id="campoTempo" onfocus="submitTempo(${this.slots.length == 0 ? 1 : this.slots.length + 1})">
            </div> 
        </div>`

        let blocoAtual = document.querySelector(`#slot_${this.slots.length == 0 ? 1 : this.slots.length + 1}`)
        this.slots.push(blocoAtual)
        }

    mostrarDescanco(index, tempo) {
        document.querySelector(`#slot_${index}`).innerHTML = ` 
        <div id="descanco_relogio">
            <img src="imagens/tempo.png" alt="">
        </div>
        <div id="descancoTexto">
            <div class="tempo" onclick="quadro.modificarDescanco(${index})">
                ${tempo} 
            </div>
        </div>`
    }

    modificarDescanco(slot) {
        console.log(slot)
        document.querySelector(`#slot_${slot}`).innerHTML = `
        <div id="descanco_relogio">
            <img src="imagens/tempo.png" alt="">
        </div>
        <div id="descancoTexto">
            <input type="text" id="campoTempo" onfocus="submitTempo(${slot})">
        </div>`
    }

    /* ============================================================================================  */

    adicionarRecompensa() { /* Adicionar o input de tempo de recompensa */
        this.quadro.innerHTML += ` 
        <div id="slot_${this.slots.length == 0 ? 1 : this.slots.length + 1}" class="premio">
            <div id="premio_troféu">
                <img src="imagens/troféu.png" alt="">
            </div>
            <div id="premioTexto">
                <input type="text" id="campoPremio" onfocus="submitPremio(${this.slots.length == 0 ? 1 : this.slots.length + 1})">
            </div> 
        </div>`

        let blocoAtual = document.querySelector(`#slot_${this.slots.length == 0 ? 1 : this.slots.length + 1}`)
        this.slots.push(blocoAtual)
        console.log(this.slots)
    }
    mostrarRecompensa(index, recompensa) {
        document.querySelector(`#slot_${index}`).innerHTML = ` 
        <div id="premio_troféu">
            <img src="imagens/troféu.png" alt="">
        </div>
        <div id="premioTexto">
            <div id="premio" onclick="quadro.modificarRecompensa(${index})">
            ${recompensa} 
        </div>`
    }
    modificarRecompensa(slot) {
        console.log(slot)
        document.querySelector(`#slot_${slot}`).innerHTML = `
        <div id="premio_troféu">
            <img src="imagens/troféu.png" alt="">
        </div>
        <div id="premioTexto">
            <input type="text" id="campoPremio" onfocus="submitPremio(${slot})">
        </div>`
    }

    /* ============================================================================================== */

    relogioPlay(acao) {
        if(document.querySelector(`#barra_progresso`).style.width == '') { /* Mudar para caso queira modificar algum bloco */
            for(let i = 1; i <= this.slots.length; i++) {
                if(document.querySelector(`#slot_${i}`).className == 'premio') {
                    this.tempo+=20;
                    this.slotsTempo.push(20);
                }
                if(document.querySelector(`#slot_${i} .tempo`) != null) {
                    this.tempo += parseInt(document.querySelector(`#slot_${i} .tempo`).innerHTML);
                    this.slotsTempo.push(parseInt(document.querySelector(`#slot_${i} .tempo`).innerHTML));
                }
            }
            this.tempo = this.tempo*6000 + 25;  
        }
        switch(acao) {
            case 'play':
                let relogio = setInterval( function() {
                    quadro.porcentagem = quadro.cronometro/quadro.tempo * 100;
                    document.querySelector(`#barra_progresso`).style.width = `${quadro.porcentagem}%`;
                    mudarCorBarraProgresso(quadro.posicaoTempo)
                    quadro.cronometro+=25;
                    if(quadro.slotsTempo[0] > 0 && quadro.cronometro%6000 == 0) {
                        quadro.slotsTempo[0]--;
                        document.querySelector(`#slot_${quadro.posicaoTempo} .tempo`).innerHTML = quadro.slotsTempo[0]; // remover ou fazer uma barrinha em cada bloco para mostrar o tempo 
                    }  
                    if (quadro.slotsTempo[0] == 0) {
                        if(document.querySelector(`#slot_${quadro.posicaoTempo}`).className == 'bloco') {
                            document.querySelector(`.bloco`).className = 'bloco_concluido';
                        }
                        if(document.querySelector(`#slot_${quadro.posicaoTempo}`).className == 'descanco') {
                            document.querySelector(`.descanco`).className = 'descanco_concluido';
                        }
                        if(document.querySelector(`#slot_${quadro.posicaoTempo}`).className == 'premio') {
                            document.querySelector(`.premio`).className = 'premio_concluido';
                        }
                        quadro.slotsTempo.shift()
                        quadro.posicaoTempo++;
                    }
                    if (quadro.cronometro == quadro.tempo) {
                        clearInterval(relogio);                     
                    }
                }, 25) 
                let pause = document.querySelector('#pause') /* Quando pausar ter que justificar o motivo da pausa */
                pause.addEventListener("click", function() {
                    clearInterval(relogio) 
                    document.querySelector('#play').style.display = 'block';
                    document.querySelector('#pause').style.display = 'none';                     
                })
                document.querySelector('#play').style.display = 'none';
                document.querySelector('#pause').style.display = 'block';
                break;
        }
    }

}

class Bd{
    constructor(){

    }

    salvar(){
        localStorage.setItem('dia', JSON.stringify(quadro))
    }
}



class Bloco {
    constructor(titulo, tempo, anotacao, revisao = Array(), marcador) {
        this.titulo = titulo;
        this.tempo = tempo;
        this.anotacao = anotacao;
        this.revisao = revisao;
        this.marcador = marcador;
    }
    /* Valida campos do fomulário do bloco */
    validaCampos() {
        this.tempo = parseInt(this.tempo);
        if(this.titulo != '' && this.tempo != '') {
            if(isNaN(this.tempo)) {
                logErroFormModal('tempo');
                return false
            }
            return true
        }
    }
}

let quadro = new Quadro();
let bd = new Bd();
function mudarCorBarraProgresso(posicaoTempo) {
    if(quadro.slots[posicaoTempo-1].className == 'bloco'){
        document.querySelector(`#barra_progresso`).style.backgroundColor  = `#6E28A8`;
    }    
    if(quadro.slots[posicaoTempo-1].className == 'descanco') {
        document.querySelector(`#barra_progresso`).style.backgroundColor  = `#5FAFF5`;
    }
    if(quadro.slots[posicaoTempo-1].className == 'premio') {
        document.querySelector(`#barra_progresso`).style.backgroundColor  = `#f5cb5c`;
    }
}

/* Escolhe entre uma das 3 opções e cria um bloco novo */

function criar(a) {
    switch(a) {
        case 1: /* Bloco */
            var fundo = document.getElementById('fundo_modal');
            var modal = document.getElementById('modal');
            modal.style.display = "grid";
            fundo.style.display = "block";
            break;
        case 2: /* Descanço */
            if(document.querySelector("#campoTempo") == null){
                quadro.adicionarDescanco();
            }
            break;
        case 3: /* Recompensa */
            if(document.querySelector("#campoPremio") == null){
                quadro.adicionarRecompensa();;
            };
            break;
    }
}

function esconderModal() {
    var fundo = document.getElementById('fundo_modal')
    modal.style.display = "none";
    fundo.style.display = "none"
}

function criarBloco() {
    let titulo = document.querySelector('#titulo_bloco').value;
    let tempo = document.querySelector('#tempo_bloco').value;
    let anotacao = document.querySelector('#anotacao_bloco').value;
    let marcador = document.querySelector('.selecionado') == null ? logErroFormModal('etiqueta') : document.querySelector('.selecionado').className;
    document.querySelector('#etiqueta').style.border = '';
    marcador = marcador.slice(28, marcador.length); 
    let revisao = Array();
    revisao = document.querySelectorAll('.revisao_marcar');
    let revisaoMarcada = Array();
    revisao.forEach(function(r) {
        if(r.checked == true) {
            revisaoMarcada.push(r.value);
        }
    })
    let bloco = new Bloco(titulo, tempo, anotacao, revisaoMarcada, marcador)
    if(bloco.validaCampos()) {
        quadro.adicionarBloco(bloco);
        limparCampos(revisao);
        esconderModal();
    }
}

function limparCampos(revisao) {
    document.querySelector('#titulo_bloco').value = "";
    document.querySelector('#tempo_bloco').value = "";
    document.querySelector('#anotacao_bloco').value = "";
    document.querySelector('.selecionado').style.borderBottom = "none";
    document.querySelector('.selecionado').className = "select_etiqueta";
    revisao.forEach(function(r) {
        r.checked = false
    })
}

function selecionarMarcador(cor) {
    let corSelecionada = '';
    function troca() {
        document.querySelector('.selecionado').style.borderBottom = 'none';
        document.querySelector('.selecionado').className = 'select_etiqueta';
    }
    function seleciona(cor, hex) {
        document.querySelector(`#etiqueta_${cor}`).className += ` selecionado ${cor}`;
        document.querySelector(`#etiqueta_${cor}`).style.borderBottom = `2px solid ${hex}`;
    }
        
        switch(cor) {
            case 'amarelo':
                corSelecionada = cor;
                if(document.querySelector('.selecionado') != null) {
                    troca();
                }
                seleciona('amarelo', '#f5cb5c');
                break;
            case 'verde':
                corSelecionada = cor;
                if(document.querySelector('.selecionado') != null) {
                    troca();
                }
                seleciona('verde', '#2b9348');
                break;
            case 'azul':
                corSelecionada = cor;
                if(document.querySelector('.selecionado') != null) {
                    troca();
                }
                seleciona('azul', '#0086eb');
                break;
            case 'laranja':
                corSelecionada = cor;
                if(document.querySelector('.selecionado') != null) {
                    troca();
                }
                seleciona('laranja', '#fb8500');
                break;
            case 'vermelho':
                corSelecionada = cor;
                if(document.querySelector('.selecionado') != null) {
                    troca();
                }
                seleciona('vermelho', '#d00000');
                break;
            case 'roxo':
                corSelecionada = cor;
                if(document.querySelector('.selecionado') != null) {
                    troca();
                }
                seleciona('roxo', '#6e28a8');
                break;
        }
}

function logErroFormModal(campo) {
    if(campo == 'etiqueta') {
        document.querySelector(`#etiqueta`).style.border = '2px solid red';
    } 
    document.querySelector(`#${campo}_bloco`).style.border = '2px solid red';
}

function submitTempo(index) {
    let input = document.querySelector(`#slot_${index} #campoTempo`);
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            let tempo = parseInt(input.value)
            if(isNaN(tempo) == false) {
                quadro.mostrarDescanco(index, tempo);
            }
        }
    })
}

function submitPremio(index) {
    let input = document.querySelector(`#slot_${index} #campoPremio`);
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            let recompensa = input.value
            if(recompensa != '' || recompensa != undefined || recompensa != null) {
                quadro.mostrarRecompensa(index, recompensa);
            }
        }
    })
}