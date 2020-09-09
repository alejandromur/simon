/*
  TODO:
  -----
  - Different difficult levels
	
  DOING:
	-----	
	- Add counter/points
	
  WISHLIST:
  ---------
  - Modify resetGame() from location.reload() to restart app

  BUG:
  ----
*/

class Simon {
	constructor(elem) {
		this.board = document.querySelector(elem)
		this.startButton = document.querySelector('.js-start')
		this.endButton = document.querySelector('.js-end')
		this.roundscounter = document.querySelector('.js-round')
		this.colors = ['red', 'green', 'blue', 'yellow']
		this.colorsLength = this.colors.length
		this.gameIsRunning = null
		this.turn = null
		this.round = 0
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
		alert('game has ended')
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
		this.increaseRound()
		this.updateRound()
		console.log(`Round: ${this.round}`)

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
					await highlightColor(color, 1000 / this.round)
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

	updateRound() {
		this.roundscounter.innerHTML = `Round: ${this.round}`
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
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new Simon('.app').bindEvents()
})
