/*
  TODO:
  -----
  - Different difficult levels
  - Increase speed when the user completes each level
  - Show alert when the patterns do not match

  WISHLIST:
  ---------

  BUG:
  ----
*/
class Simon {
	constructor(elem) {
		this.game = document.querySelector(elem)
		this.colors = ['red', 'green', 'blue', 'yellow']
		this.colorsLength = this.colors.length
		this.round = 0
		this.humanCounter = 0
		this.turn = null
		this.pattern = []
		this.humanAnswer = []
		this.elements = {
			red: this.game.querySelector('[data-color="red"]'),
			blue: this.game.querySelector('[data-color="blue"]'),
			yellow: this.game.querySelector('[data-color="yellow"]'),
			green: this.game.querySelector('[data-color="green"]'),
		}
	}

	init() {
		// Get level selected
		// Create this fn
		this.game.addEventListener('click', event => this.captureEvent(event))
		this.turn = 'computer'
		this.game.setAttribute('data-turn', 'computer')
		this.addRandomColor()
	}

	increaseRoundCounter() {
		this.round++
	}

	toggleTurn() {
		if (this.turn === 'computer') {
			this.turn = 'human'
			this.game.setAttribute('data-turn', 'human')
		} else {
			this.turn = 'computer'
			this.game.setAttribute('data-turn', 'computer')
		}
		console.log(this.turn)
	}

	addRandomColor() {
		let randomColor = Math.floor(Math.random() * this.colorsLength)
		this.pattern = [...this.pattern, this.colors[randomColor]]
		this.highlightPattern()
	}

	highlightPattern() {
		const highlightColor = (color, ms) =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					this.elements[color].classList.add('is-active')
				}, ms)
				setTimeout(() => {
					resolve(this.elements[color].classList.remove('is-active'))
				}, ms + 500)
			})

		async function asyncForEach(array, callback) {
			for (let index = 0; index < array.length; index++) {
				await callback(array[index], index, array)
			}
		}

		const start = async () => {
			await asyncForEach(this.pattern, async color => {
				console.log(color)
				await highlightColor(color, 1000)
			})
			console.log('Done')
			this.nextTurn()
		}

		start()
	}

	nextTurn() {
		this.increaseRoundCounter()
		this.toggleTurn()

		if (this.turn === 'computer') {
			this.addRandomColor()
		} else {
			this.resetHumanAnswer()
		}
	}

	resetHumanAnswer() {
		this.humanAnswer = []
		this.humanCounter = 0
	}

	captureEvent(event) {
		const target = event.target.getAttribute('data-color')

		if (!target) {
			return false
		}

		console.log(
			target,
			this.pattern.length - 1,
			this.humanCounter,
			this.pattern,
			this.pattern[this.humanCounter]
		)

		if (target !== this.pattern[this.humanCounter]) {
			this.endGame()
		}

		if (this.humanCounter === this.pattern.length - 1) {
			this.nextTurn()
		}
		this.humanCounter++

		// if (this.pattern.length === this.humanAnswer.length) {
		// 	this.checkAnswer(this.humanAnswer)
		// }
	}

	// checkAnswer(answer) {
	// 	let areEqual = false

	// 	for (let i in this.pattern) {
	// 		//   console.log(this.pattern[i], answer[i]);

	// 		if (this.pattern[i] === answer[i]) {
	// 			areEqual = true
	// 		} else {
	// 			areEqual = false
	// 		}
	// 	}

	// 	if (areEqual) {
	// 		this.nextTurn()
	// 	} else {
	// 		this.endGame()
	// 	}
	// }

	endGame() {
		alert('The Game has ended')
	}
}

const game = new Simon('.app')
const startButton = document.querySelector('.js-start')

startButton.addEventListener('click', e => {
	startButton.setAttribute('hidden', true)
	game.init()
})
