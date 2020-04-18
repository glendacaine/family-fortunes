import { BingoBall } from '../../models/bingo-ball';
export class BingoSetNumberOfBalls {
	static readonly type = '[Bingo] Set Number Of Balls';
	constructor(public readonly numberOfBalls: number) { }
}

export class BingoNewGame {
	static readonly type = '[Bingo] New Game';
}

export class BingoSetBallPlayed {
	static readonly type = '[Bingo] Set Ball Played';
	constructor(public readonly ball: number) { }
}

