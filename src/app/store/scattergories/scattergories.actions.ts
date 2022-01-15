export class ScattergoriesLoadLists {
	static readonly type = '[Scattegories] Load Lists';
}

export class ScattergoriesResetList {
	static readonly type = '[Scattegories] Reset List';
}

export class ScattergoriesLoadListsSuccess {
	static readonly type = '[Scattegories] Load Lists Success';
	constructor(public readonly resp: any) { }
}

export class ScattergoriesSetListPlayed {
	static readonly type = '[Scattegories] Set List Played';
	constructor(public readonly listIdx: number) { }
}

export class ScattergoriesNewGame {
	static readonly type = '[Scattegories] New Game';
}
