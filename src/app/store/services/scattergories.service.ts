import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ScattergoriesService {
	constructor(private restangular: Restangular) { }

	load(): Observable<any> {
		return this.restangular.one('assets').one('json').one('scattergories.json').get();
	}
}
