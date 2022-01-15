import { QuestionsGetAll } from '../../store/family-fortunes/family-fortunes.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private store: Store) { }

	ngOnInit(): void {
	}

	goToGame(game) {
		this.store.dispatch(new Navigate([game]));
	}
}
