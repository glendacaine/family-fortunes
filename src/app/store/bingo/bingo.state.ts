import produce from 'immer';
import { State, Action, StateContext } from '@ngxs/store';
import { BingoBall } from '../../models/bingo-ball';
import { BingoSetNumberOfBalls, BingoNewGame, BingoSetBallPlayed } from './bingo.actions';

export class BingoStateModel {
	balls: BingoBall[];
	currentBall: BingoBall;
	numberOfBalls: number;
}

const stateDefaults = {
	balls: [],
	currentBall: null,
	numberOfBalls: 90
};

@State<BingoStateModel>({
	name: 'bingo',
	defaults: stateDefaults
})
export class BingoState {
	@Action(BingoSetNumberOfBalls)
	onBingoSetNumberOfBalls(ctx: StateContext<BingoStateModel>, { numberOfBalls }: BingoSetNumberOfBalls) {
		ctx.patchState(produce(ctx.getState(), draft => {
			draft.numberOfBalls = numberOfBalls;
		}));
	}

	@Action(BingoNewGame)
	onBingoNewGame(ctx: StateContext<BingoStateModel>) {
		ctx.patchState(produce(ctx.getState(), draft => {
			draft.balls = [];
			draft.currentBall = null;
		}));

		for (let i = 1; i <= ctx.getState().numberOfBalls; i++) {
			ctx.patchState(produce(ctx.getState(), draft => {
				draft.balls.push({ number: i, played: false });
			}));
		}
	}

	@Action(BingoSetBallPlayed)
	onBingoSetBallPlayed(ctx: StateContext<BingoStateModel>, { ball }: BingoSetBallPlayed) {
		ctx.patchState(produce(ctx.getState(), draft => {
			draft.balls[ball - 1].played = true;
		}));

		ctx.patchState(produce(ctx.getState(), draft => {
			draft.currentBall = draft.balls[ball - 1];
		}));
	}
}
