import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../../model/hero';
import { HEROES } from '../../model/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    return heroes;
  }
}
