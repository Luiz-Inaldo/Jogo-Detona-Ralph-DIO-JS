    // criando a constante onde abrigará as variáveis de view (alteram elementos visuais)
    // e values (alteram valores que funcionam em segundo plano).

const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDown: setInterval(countDownTime, 1000),
    }
};

// function que vai contar o tempo regressivamente
function countDownTime() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDown);
        clearInterval(state.actions.timeId);
        alert('Game Over! Seus pontos foram: ' + state.values.result);
    }
}

// function onde mostrará o enemy
function randomSquare() {
    
    // limpando todos os campos que possam conter a classe 'enemy'.
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    })

    // sorteando um número aleatório para escolher um quadrado que receberá o enemy.
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];

    // adicionando o enemy no quadrado sorteado.
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

// function que detectará o clique do mouse sobre o enemy.
function addListenerHitBox() {

    // forEach para percorrer todos os quadrados.
    state.view.squares.forEach((square) => {
        // adicionando um evento de clique de mouse no quadrado.
        square.addEventListener('mousedown', () => {
            
            // se o id do quadrado for igual ao valor de hitPosition
            if(square.id === state.values.hitPosition){
                state.values.result++ // aumenta em 1 o valor de result
                state.view.score.textContent = state.values.result; // aumenta o contexto textual do score de acordo com o result.
                state.values.hitPosition = null; // seta o hitPosition para Null, para que não se faça mais de 1 ponto por vez.
                playSound();
            }
        })
    })
}

// function para tocar o som de pontuação
function playSound(){
    let sound = new Audio('./src/audios/hit.m4a');
    sound.volume = 0.2; // setando volume do audio.
    sound.play();
}

// function que rodará o jogo.
function initialize() {
    addListenerHitBox();
}

initialize();