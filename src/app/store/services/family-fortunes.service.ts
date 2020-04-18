import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyFortunesService {
  constructor(private restangular: Restangular) { }

  getQuestions(): Observable<any> {
    return this.restangular.one('assets').one('json').one('family-fortunes.json').get();
  }
}
