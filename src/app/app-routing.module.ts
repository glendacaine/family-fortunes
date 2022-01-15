import { FamilyFortunesComponent } from './containers/family-fortunes/family-fortunes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { QuestionPageComponent } from './containers/question-page/question-page.component';
import { LayoutPageComponent } from './containers/layout-page/layout-page.component';
import { BingoBallsComponent } from './containers/bingo-balls/bingo-balls.component';
import { ScattergoriesComponent } from './containers/scattergories/scattergories.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutPageComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: HomeComponent,
			},
			{
				path: 'home',
				component: HomeComponent,
			},
			{
				path: 'family-fortunes',
				component: FamilyFortunesComponent
			},
			{
				path: 'family-fortunes/question/:number',
				component: QuestionPageComponent
			},
			{
				path: 'scattergories',
				component: ScattergoriesComponent
			},
			{
				path: 'bingo-balls',
				component: BingoBallsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
