import produce from 'immer';
import { State, Action, StateContext } from '@ngxs/store';
import { ScattergoriesLoadLists, ScattergoriesLoadListsSuccess, ScattergoriesNewGame, ScattergoriesResetList } from './scattergories.actions';
import { ScattergoriesService } from '../services/scattergories.service';
import { tap } from 'rxjs/operators';
import { ScattergoryList } from '../../models/scattergory-list';

export class ScattergoriesStateModel {
	currentList: ScattergoryList;
	lists: ScattergoryList[];
	playedLists: number[];
}

const stateDefaults: ScattergoriesStateModel = {
	currentList: null,
	lists: [],
	playedLists: []
};

@State<ScattergoriesStateModel>({
	name: 'scattergories',
	defaults: stateDefaults
})
export class ScattergoriesState {
	constructor(
		private scattegoriesService: ScattergoriesService
	) {

	}

	@Action(ScattergoriesLoadLists)
	onScattegoriesGetList(ctx: StateContext<ScattergoriesStateModel>) {
		if (ctx.getState().lists && ctx.getState().lists.length > 0) return;

		this.scattegoriesService.load()
			.pipe(
				tap(lists => ctx.dispatch(new ScattergoriesLoadListsSuccess(lists)))
			).subscribe();
	}

	@Action(ScattergoriesLoadListsSuccess)
	onScattegoriesLoadListsSuccess(ctx: StateContext<ScattergoriesStateModel>, { resp }: ScattergoriesLoadListsSuccess) {
		ctx.patchState(produce(ctx.getState(), (draft: ScattergoriesStateModel) => {
			draft.lists = resp.lists;
		}));
	}

	@Action(ScattergoriesNewGame)
	onScattegoriesNewGame(ctx: StateContext<ScattergoriesStateModel>) {
		this.nextList(ctx);
	}

	@Action(ScattergoriesResetList)
	onScattergoriesResetList(ctx: StateContext<ScattergoriesStateModel>) {
		ctx.patchState(produce(ctx.getState(), (draft: ScattergoriesStateModel) => {
			draft.currentList = null;
		}));
	}

	nextList(ctx: StateContext<ScattergoriesStateModel>) {
		const nextList = Math.floor(Math.random() * ctx.getState().lists.length);

		if (ctx.getState().playedLists && ctx.getState().playedLists.length === ctx.getState().lists.length || !ctx.getState().playedLists) {
			ctx.patchState(produce(ctx.getState(), (draft: ScattergoriesStateModel) => {
				draft.playedLists = [];
			}));
		}

		if (ctx.getState().playedLists.indexOf(nextList) > -1) {
			this.nextList(ctx);
			return;
		}

		ctx.patchState(produce(ctx.getState(), (draft: ScattergoriesStateModel) => {
			draft.playedLists.push(nextList);
			draft.currentList = ctx.getState().lists[nextList];
		}));
	}
}
