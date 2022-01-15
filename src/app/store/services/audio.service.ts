import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
	providedIn: 'root'
})
export class QuizAudioService {
	beeps: any[] = [];
	sounds: any[] = [];
	soundFiles = [];
	beep1: any;
	beep2: any;

	constructor() {
		for (let i = 1; i <= 12; i++) {
			this.soundFiles.push(`sound${i}.mp3`);
		}
	}

	register() {
		this.sounds = [];

		this.soundFiles.forEach(file => {
			const howl = new Howl({
				src: [`../assets/sounds/${file}`]
			});

			this.sounds.push(howl);
		});

		this.beep1 = new Howl({ src: ['../assets/sounds/beep1.mp3'] });
		this.beep2 = new Howl({ src: ['../assets/sounds/beep2.mp3'] });
	}

	playRandom() {
		const randomHowl = Math.floor(Math.random() * this.sounds.length);
		const howl = this.sounds[randomHowl];

		this.play(howl);
	}

	playBeep1() {
		this.play(this.beep1);
	}

	playBeep2() {
		this.play(this.beep2);
	}

	play(howl: Howl) {
		howl.play();
	}
}
