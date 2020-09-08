/*
  TODO:
  -----
  - Different difficult levels
  - Increase speed when the user completes each level
	
  DOING:
	-----
  - Modify resetGame() from location.reload() to restart app

	
  WISHLIST:
  ---------

  BUG:
  ----
*/

class Simon {
	constructor(elem) {
		this.board = document.querySelector(elem)
		this.startButton = document.querySelector('.js-start')
		this.endButton = document.querySelector('.js-end')
		this.colors = ['red', 'green', 'blue', 'yellow']
		this.colorsLength = this.colors.length
		this.gameIsRunning = null
		this.turn = null
		this.round = 1
		this.pattern = []
		this.humanCounter = 0
		this.humanAnswer = []
	}

	bindEvents() {
		this.startButton.addEventListener('click', this.startGame.bind(this))
		this.endButton.addEventListener('click', this.endGame.bind(this))
	}

	startGame() {
		console.log('game has started', this)
		this.startButton.setAttribute('disabled', '')
		this.endButton.removeAttribute('disabled')
		this.board.addEventListener('click', this.listener.bind(this))
		this.gameIsRunning = true
		this.computerTurn()
	}

	endGame() {
		console.log('game has ended')
		this.endButton.setAttribute('disabled', '')
		this.startButton.removeAttribute('disabled')
		this.board.removeAttribute('data-turn')
		this.board.removeEventListener('click', this.listener)
		this.gameIsRunning = false
		this.resetGame()
	}

	resetGame() {
		window.location.reload()
		// this.turn = null
		// this.round = 1
		// this.pattern = []
		// this.humanCounter = 0
		// this.humanAnswer = []
	}

	listener(event) {
		const target = event.target.getAttribute('data-color')

		if (!target || !this.gameIsRunning) {
			return
		}

		if (target !== this.pattern[this.humanCounter]) {
			this.endGame()
		}

		if (this.humanCounter === this.pattern.length - 1) {
			this.nextTurn()
		}

		this.humanCounter++
	}

	computerTurn() {
		this.turn = 'computer'
		this.board.setAttribute('data-turn', 'computer')
		// console.log(`Round: ${this.round}`)

		const addRandomColor = () => {
			let randomColor = Math.floor(Math.random() * this.colorsLength)
			this.pattern = [...this.pattern, this.colors[randomColor]]
			highlightPattern()
		}

		const highlightPattern = () => {
			const highlightColor = (color, ms) =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						this.board
							.querySelector(`[data-color="${color}"]`)
							.classList.add('is-active')
					}, ms)
					setTimeout(() => {
						resolve(
							this.board
								.querySelector(`[data-color="${color}"]`)
								.classList.remove('is-active')
						)
					}, ms + 500)
				})

			async function asyncForEach(array, callback) {
				for (let index = 0; index < array.length; index++) {
					await callback(array[index], index, array)
				}
			}

			const start = async () => {
				await asyncForEach(this.pattern, async color => {
					console.log(
						`Color: ${color} - Pattern: ${this.pattern} - Round: ${this.round}`
					)
					await highlightColor(color, 1000)
				})
				this.nextTurn()
			}

			start()
		}

		addRandomColor()
	}

	humanTurn() {
		this.turn = 'human'
		this.board.setAttribute('data-turn', 'human')
		this.humanAnswer = []
		this.humanCounter = 0
	}

	increaseRound() {
		this.round++
	}

	nextTurn() {
		if (!this.gameIsRunning) {
			return false
		}

		if (this.turn === 'computer') {
			this.humanTurn()
		} else {
			this.computerTurn()
		}

		this.increaseRound()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Simon('.app').bindEvents()
})
