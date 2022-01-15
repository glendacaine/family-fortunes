import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/store/app.state';
import { ScattergoriesLoadLists, ScattergoriesNewGame, ScattergoriesResetList } from '../../store/scattergories/scattergories.actions';
import { ScattergoryList } from '../../models/scattergory-list';
import { QuizAudioService } from '../../store/services/audio.service';

@Component({
	selector: 'app-scattergories',
	templateUrl: './scattergories.component.html',
	styleUrls: ['./scattergories.component.scss']
})
export class ScattergoriesComponent implements OnInit, OnDestroy {
	countDown: number;
	currentLetter: string;
	interval: any;
	letterInterval: any;
	letterPicked: boolean;
	letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W'];
	list: ScattergoryList;
	newGameInterval: any;
	newGameTimer: any;
	readyClass: string;
	readySteady: string;
	seconds = 180;
	secondsAsString: string;
	startTimeout: any;

	constructor(
		private store: Store,
		private audioService: QuizAudioService
	) {
		this.store.dispatch(new ScattergoriesResetList());

		this.audioService.register();
	}

	ngOnInit() {
		this.store.dispatch(new ScattergoriesLoadLists());

		this.store.select((state: AppState) => state.scattergories.currentList)
			.subscribe(list => {
				this.list = list;
			});
	}

	newList() {
		this.resetAll();

		this.store.dispatch(new ScattergoriesNewGame());
		this.readySteady = '20 Seconds<br/>to<br/>Start of Game';

		let letterIndex = 0;

		this.newGameTimer = setTimeout(() => {
			this.readySteady = '';

			this.letterInterval = setInterval(() => {
				this.letterPicked = false;

				if (letterIndex === 20) {
					clearInterval(this.letterInterval);
					this.letterPicked = true;
					this.startGame();
				}

				const currentLetterIdx = Math.floor(Math.random() * this.letters.length);
				this.currentLetter = this.letters[currentLetterIdx];
				letterIndex++;
			}, 150);
		}, 20000);
	}

	resetAll() {
		if (this.letterInterval) clearInterval(this.letterInterval);
		if (this.interval) clearInterval(this.interval);
		if (this.newGameTimer) clearTimeout(this.newGameTimer);
		if (this.startTimeout) clearTimeout(this.newGameTimer);

		this.seconds = 3;
	}

	startGame() {
		clearInterval(this.newGameInterval);
		this.seconds = 3;
		this.secondsAsString = this.seconds.toString();
		this.audioService.playBeep1();

		this.interval = setInterval(() => {
			this.seconds--;
			this.secondsAsString = this.seconds.toString();
			this.audioService.playBeep1();

			if (this.seconds === 0) {
				this.audioService.playBeep2();
				this.secondsAsString = 'GO!';
				clearInterval(this.interval);
				this.startTimer();
			}
		}, 1000);
	}

	startTimer() {
		this.seconds = 181;

		this.startTimeout = setTimeout(() => {
			this.interval = setInterval(() => {
				this.seconds--;
				this.secondsAsString = this.seconds.toString();

				if (this.seconds <= 10) {
					this.audioService.playBeep1();
				}

				if (this.seconds === 0) {
					this.audioService.playRandom();
					clearInterval(this.interval);
				}
			}, 1000);
		}, 250);
	}

	ngOnDestroy() {
		this.resetAll();
	}
}
