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
}
