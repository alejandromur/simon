/*

FEATURES:
---------
- En cada ronda destacar los colores del patrón de la máquena
- 

BUGS:
---------
- Cuando selecciono un color marca ese color para todas las respuestas de ese turno

DONE:
---------
- En cada ronda destacar los colores que seleccione el usuario como respuesta

*/

class Simon {
    constructor(elem) {
        this.game = document.querySelector(elem);
        this.colors = ['red', 'green', 'blue', 'yellow'];
        this.colorsLength = this.colors.length;
        this.round = 0;
        this.turn = undefined;
        this.lastColorSelected = '';
        this.pattern = [];
        this.humanAnswer = [];
        this.elements = {
            red: this.game.querySelector('[data-color="red"]'),
            blue: this.game.querySelector('[data-color="blue"]'),
            yellow: this.game.querySelector('[data-color="yellow"]'),
            green: this.game.querySelector('[data-color="green"]')
        }
    }

    init() {
        this.nextTurn();
    }

    increaseRoundCounter() {
        this.round++;
    }

    changeTurn() {
        if (this.turn === undefined) {
            this.turn = 'computer';
            this.game.setAttribute('data-turn', 'computer');
            return;
        }

        if (this.turn === 'computer') {
            this.turn = 'human';
            this.game.setAttribute('data-turn', 'human');
        } else {
            this.turn = 'computer';
            this.game.setAttribute('data-turn', 'computer');
        }
        // this.nextTurn();
    }

    addRandomColor() {
        let randomColor = Math.floor(Math.random() * this.colorsLength);
        this.lastColorSelected = this.colors[randomColor];
        this.pattern = [...this.pattern, this.lastColorSelected];
        console.log(this.pattern);
        this.highlightPattern();
    }

    highlightPattern() {
        setTimeout(() => {
            this.elements[this.lastColorSelected].classList.add('is-active');

            setTimeout(() => {
                this.elements[this.lastColorSelected].classList.remove('is-active');
                this.nextTurn();
            }, 1000);
        }, 1000);
    }

    nextTurn() {
        this.increaseRoundCounter();
        this.changeTurn();

        if (this.turn === 'computer') {
            // console.log('computer');
            this.addRandomColor();
        } else {
            // console.log('human');
            this.listenHumanAnswer();
        }
    }

    listenHumanAnswer() {
        this.humanAnswer = [];
        this.game.addEventListener('click', (e) => {
            this.humanAnswer.push(e.target.getAttribute('data-color'));
            console.log(this.humanAnswer);
            console.log(this.pattern.length);
            if (this.pattern.length === this.humanAnswer.length) {
                this.checkAnswer(this.humanAnswer);
            }
        });
    }

    checkAnswer(answer) {
        console.log('check answers');
        console.log(this.pattern);
        console.log(answer);

        let areEqual = false;

        for (let i in this.pattern) {
            console.log(this.pattern[i], answer[i]);

            if (this.pattern[i] === answer[i]) {
                areEqual = true;
            } else {
                areEqual = false;
            }
        }

        if (areEqual) {
            this.nextTurn();
        } else {
            this.endGame();
        }
    }

    endGame() {
        alert('The Game has ended');
        document.location.reload();
    }
}

const GAME = new Simon('.app');
const START_BUTTON = document.querySelector('button');

START_BUTTON.addEventListener('click', (e) => {
    START_BUTTON.setAttribute('hidden', true);
    GAME.init();
});