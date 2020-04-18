import { BingoNewGame } from './../../store/bingo/bingo.actions';
import { Component, OnInit } from '@angular/core';
import { BingoBall } from '../../models/bingo-ball';
import { Store } from '@ngxs/store';
import { BingoSetNumberOfBalls, BingoSetBallPlayed } from '../../store/bingo/bingo.actions';

@Component({
	selector: 'app-bingo-balls',
	templateUrl: './bingo-balls.component.html',
	styleUrls: ['./bingo-balls.component.scss']
})
export class BingoBallsComponent implements OnInit {
	balls: BingoBall[];
	numberOfBalls: number;
	currentBall: BingoBall;
	numberOfRows = this.numberOfBalls / 10;

	constructor(
		private store: Store
	) {
		this.store.select(state => state.bingo)
			.subscribe(bingo => {
				this.numberOfBalls = bingo.numberOfBalls;

				this.currentBall = bingo.currentBall;

				if (bingo.balls.length === this.numberOfBalls) {
					this.balls = bingo.balls;
				}
			});
	}

	newGame() {
		this.store.dispatch([new BingoSetNumberOfBalls(this.numberOfBalls), new BingoNewGame()]);
	}

	confirmNewGame() {
		const newGame = confirm('Are you sure you want to start a new game?');

		if (newGame) {
			this.newGame();
		}
	}

	ngOnInit() {
	}

	nextBall() {
		const nextBall = Math.floor(Math.random() * this.numberOfBalls) + 1;

		if (this.balls[nextBall - 1].played) {
			this.nextBall();
		}

		this.store.dispatch(new BingoSetBallPlayed(nextBall));
	}

	getClass() {
		if (!this.balls || this.balls.length === 0) {
			return 'col-12';
		}

		return 'col-12 col-lg-7';
	}
}
