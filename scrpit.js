const html = document.querySelector('html');

const focoBtn = document.getElementById('foco');
const curtoBtn = document.getElementById('curto');
const longoBtn = document.getElementById('longo');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause span');

const startIcon = document.querySelector('.app__card-primary-butto-icon');
const pauseArrow = new Image('');
const playArrow = new Image('/imagens/play_arrow.png');

const tempoNaTela = document.querySelector('#timer');

const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const playMusica = new Audio('/sons/play.wav');
const pauseMusica = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBtn.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 1500;
    alteraContexto('foco');
    focoBtn.classList.add('active');
})
curtoBtn.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 300;
    alteraContexto('descanso-curto');
    curtoBtn.classList.add('active');

})
longoBtn.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 900;
    alteraContexto('descanso-longo');
    longoBtn.classList.add('active');
})

function alteraContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
                titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case "descanso-curto": titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo": titulo.innerHTML = `
                Hora de voltar à superficie,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <=0){
        beep.play();
        alert('Tempo finalizado!');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        pauseMusica.play();
        zerar()
        return
    }
    playMusica.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = "Pausar"
    startIcon.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar"
    startIcon.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();