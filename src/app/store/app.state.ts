import { BingoStateModel } from './bingo/bingo.state';
import { FamilyFortunesStateModel } from './family-fortunes/family-fortunes.state';
import { ScattergoriesStateModel } from './scattergories/scattergories.state';

export interface AppState {
	bingoBalls: BingoStateModel;
	familyFortunes: FamilyFortunesStateModel;
	scattergories: ScattergoriesStateModel;
}
