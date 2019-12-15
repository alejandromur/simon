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
            red: this.game.querySelector('.red'),
            blue: this.game.querySelector('.blue'),
            yellow: this.game.querySelector('.yellow'),
            green: this.game.querySelector('.green')
        }
    }

    init() {
        this.nextTurn();
    }

    increaseRoundCounter() {
        this.round++;
        // console.log(this.round);
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
            console.log('computer');
            this.addRandomColor();
        } else {
            console.log('human');
            this.listenHumanAnswer();
            // this.changeTurn();
            // this.nextTurn();
        }
    }

    listenHumanAnswer() {
        this.humanAnswer = [];
        this.game.addEventListener('click', (e) => {
            this.humanAnswer.push(e.target.getAttribute('class'));
            console.log(this.humanAnswer.length);
            // if (this.pattern.length === this.humanAnswer.length) {
            //     this.nextTurn();
            // }
        });
    }
}

const GAME = new Simon('.app');
const START_BUTTON = document.querySelector('button');

START_BUTTON.addEventListener('click', (e) => {
    START_BUTTON.classList.add('hidden');
    GAME.init();
});