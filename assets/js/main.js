class Simon {
  constructor(elem) {
    this.game = document.querySelector(elem);
    this.colors = ['red', 'green', 'blue', 'yellow'];
    this.colorsLength = this.colors.length;
    this.round = 0;
    this.turn = null;
    this.lastColorSelected = null;
    this.pattern = [];
    this.humanAnswer = [];
    this.elements = {
      red: this.game.querySelector('[data-color="red"]'),
      blue: this.game.querySelector('[data-color="blue"]'),
      yellow: this.game.querySelector('[data-color="yellow"]'),
      green: this.game.querySelector('[data-color="green"]'),
    };
  }

  init() {
    this.game.addEventListener('click', (event) => this.captureEvent(event));
    this.nextTurn();
  }

  increaseRoundCounter() {
    this.round++;
  }

  toggleTurn() {
    console.log(this.turn);
    
    if (this.turn === null) {
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
    console.log(this.turn);
  }

  addRandomColor() {
    let randomColor = Math.floor(Math.random() * this.colorsLength);
    this.lastColorSelected = this.colors[randomColor];
    this.pattern = [...this.pattern, this.lastColorSelected];
    console.log(this.pattern);
    this.highlightPattern();
  }

  highlightPattern() {
    let counter = 0;
    let time = 1000;
    this.pattern.forEach((color, idx, array) => {
      setTimeout(() => {
        this.elements[color].classList.add('is-active');
      }, time);
      setTimeout(() => {
        this.elements[color].classList.remove('is-active');
      }, time + 500);
      
      time += 1000;
      counter++;
      
      if (counter === array.length) {
        this.nextTurn();
      }
    });
    
  }

  nextTurn() {
    this.increaseRoundCounter();
    this.toggleTurn();

    if (this.turn === 'computer') {
      this.addRandomColor();
    } else {
      this.resetHumanAnswer();
    }
  }

  resetHumanAnswer() {
    this.humanAnswer = [];
  }

  captureEvent(event) {
    const target = event.target.getAttribute('data-color');

    if(target) {
      this.humanAnswer.push(target);
    }
    
    if (this.pattern.length === this.humanAnswer.length) {
      this.checkAnswer(this.humanAnswer);
    }
  }

  checkAnswer(answer) {
    let areEqual = false;

    for (let i in this.pattern) {
      //   console.log(this.pattern[i], answer[i]);

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

const game = new Simon('.app');
const startButton = document.querySelector('.js-start');

startButton.addEventListener('click', e => {
  startButton.setAttribute('hidden', true);
  game.init();
});
