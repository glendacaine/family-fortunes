import { environment } from 'src/environments/environment';
import { HomeComponent } from './containers/home/home.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { RestangularModule } from 'ngx-restangular';
import { Store, NgxsModule } from '@ngxs/store';
import { States } from './store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuestionPageComponent } from './containers/question-page/question-page.component';
import { LayoutPageComponent } from './containers/layout-page/layout-page.component';
import { FamilyFortunesComponent } from './containers/family-fortunes/family-fortunes.component';
import { BingoBallsComponent } from './containers/bingo-balls/bingo-balls.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

export function RestangularConfigFactory(RestangularProvider) {
	RestangularProvider.setBaseUrl(environment.api);
	RestangularProvider.setPlainByDefault(true);
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		QuestionPageComponent,
		LayoutPageComponent,
		FamilyFortunesComponent,
		BingoBallsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		NgxsFormPluginModule,
		NgxsFormPluginModule.forRoot(),
		NgxsModule.forRoot(States),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsStoragePluginModule.forRoot({ storage: 1 }),
		NgxsRouterPluginModule.forRoot(),
		ReactiveFormsModule,
		RestangularModule.forRoot([Store], RestangularConfigFactory),
		MatDialogModule,
		BrowserAnimationsModule,
		TabsModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
