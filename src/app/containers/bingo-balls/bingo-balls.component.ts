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
	calls: string[];
	ballsCalled: number;

	constructor(
		private store: Store
	) {
		this.populateCalls();

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
		this.ballsCalled = 0;
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
			return;
		}

		this.store.dispatch(new BingoSetBallPlayed(nextBall));
		this.ballsCalled = this.balls.filter(b => b.played).length;
	}

	getClass() {
		if (!this.balls || this.balls.length === 0) {
			return 'col-12';
		}

		return 'col-12 col-lg-7';
	}

	populateCalls() {
		this.calls = [
			'Kellys Eye',
			'Open a window',
			'Cup of Tea',
			'Knock at the Door',
			'Man Alive',
			'Tom Mix',
			'Lucky Seven',
			'Sexy Kate',
			'Doctor’s Orders',
			'Stick your tongue up a hen',
			'Legs 11',
			'One Dozen',
			'Unlucky for Some',
			'Valentine’s Day',
			'Young and Keen',
			'Sweet 16',
			'Dancing Queen',
			'Coming of Age',
			'Keep ‘em keen',
			'Getting plenty ',
			'Adult fun',
			'Two Little Ducks',
			'Thee and Me',
			'Red Raw',
			'Duck and Dive',
			'Pick and Mix',
			'Gateway to Heaven',
			'Over Weight',
			'Rise and Shine',
			'Dirty Gertie',
			'Up the Bum',
			'Buckle My Shoe',
			'Dirty Knee',
			'Ask for More',
			'Jump and Jive',
			'Three Dozen',
			'More than 11',
			'Christmas Cake',
			'Steps',
			'Naughty 40',
			'I’ve done your mum',
			'Winnie the Pooh',
			'Down on Your Knees',
			'On all fours',
			'Halfway There',
			'Up to Tricks',
			'Four and Seven',
			'Four Dozen',
			'PC',
			'Half a Century',
			'Tweak of the Thumb',
			'Danny La Rue',
			'Stuck in the Tree',
			'Clean the Floor',
			'Snakes Alive',
			'Was She Worth It?',
			'Heinz Varieties',
			'Make Them Wait',
			'Brighton Line',
			'Five Dozen',
			'Bakers Bun',
			'Turn the Screw',
			'Tickle Me 63',
			'Red Raw',
			'Muff Dive',
			'Mutual licks',
			'Take me to heaven',
			'Time to mate',
			'Either Can Dine',
			'Three Score and 10',
			'Bang on the Drum',
			'Six Dozen',
			'Queen B',
			'Candy Store',
			'Strive and Strive',
			'Trombones',
			'Sunset Strip',
			'Heaven’s Gate',
			'One More Time',
			'Eight and Blank',
			'Stop and Run',
			'Straight On Through',
			'Time for Tea',
			'Seven Dozen',
			'Staying Alive',
			'Between the Sticks',
			'Torquay in Devon',
			'Two Fat Ladies',
			'Nearly There',
			'Top of the Shop'
		];
	}
}
