import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../../model/hero';
import { HEROES } from '../../model/mock-heroes';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    this.messageService.add("ciao, sono l\ 'hero services e ho caricato gli eroi");
    return heroes;
  }

  getHero(id: number): Observable<Hero>{
  const hero = HEROES.find(hero => hero.id === id)!;
  this.messageService.add(`HeroService: ho trovato l'hero con id=${id}`);
  return of(hero);
  }

  // find(id: number){
  //   for (const hero of HEROES) {
  //     if (hero.id === id) {
  //       return hero;
  //     }
  //   }
  //       return undefined
  // }
  
}
