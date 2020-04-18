import produce from 'immer';
import { State, Action, StateContext } from '@ngxs/store';
import { FamilyFortunesService } from '../services/family-fortunes.service';
import { QuestionsGetAll, QuestionsGetAllSuccess } from './family-fortunes.actions';
import { tap } from 'rxjs/operators';

export class FamilyFortunesStateModel {
	questions: any;
}

const stateDefaults = {
	questions: null
};

@State<FamilyFortunesStateModel>({
	name: 'familyFortunes',
	defaults: stateDefaults
})
export class FamilyFortunesState {
	constructor(private familyFortunesService: FamilyFortunesService) { }

	@Action(QuestionsGetAll)
	onQuestionsGetAll(ctx: StateContext<FamilyFortunesStateModel>) {
		if (ctx.getState().questions) return;

		this.familyFortunesService.getQuestions()
			.pipe(
				tap(questions => ctx.dispatch(new QuestionsGetAllSuccess(questions)))
			).subscribe();
	}

	@Action(QuestionsGetAllSuccess)
	onQuestionsGetAllSuccess(ctx: StateContext<FamilyFortunesStateModel>, { questions }: QuestionsGetAllSuccess) {
		ctx.patchState(produce(ctx.getState(), draft => {
			draft.questions = questions.questions;
		}));
	}
}
