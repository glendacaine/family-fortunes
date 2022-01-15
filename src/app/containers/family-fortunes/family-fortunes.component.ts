import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { QuestionsGetAll } from 'src/app/store/family-fortunes/family-fortunes.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
	selector: 'app-family-fortunes',
	templateUrl: './family-fortunes.component.html',
	styleUrls: ['./family-fortunes.component.scss']
})
export class FamilyFortunesComponent implements OnInit {
	constructor(private store: Store) { }

	ngOnInit() {
		this.store.dispatch(new QuestionsGetAll());
	}

	go() {
		this.store.dispatch(new Navigate(['family-fortunes', 'question', 0]));
	}
}
