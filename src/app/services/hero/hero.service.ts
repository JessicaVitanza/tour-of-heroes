import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, pipe, catchError } from 'rxjs';
import { Hero } from '../../model/hero';
// import { HEROES } from '../../model/mock-heroes';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'https://628778b1e9494df61b39b038.mockapi.io/recipes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    //const heroes = of(HEROES)
    // this.log("ciao, sono l\ 'hero services e ho caricato gli eroi");
    // return heroes;

    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap( _ => this.log('ho caricato gli eroi')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }


/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

getHero(id: string): Observable<Hero> {
  const heroUrl = this.heroesUrl + '/' + id;
  return this.http.get<Hero>(heroUrl).pipe(
    tap(_ => this.log(`ho caricato l\'eroe con id:` + id)),
    catchError(this.handleError<Hero>(`getHero`))
    );
}
  
  log(message: string) : void {
    this.messageService.add(message);
  }


  updateHero (hero: Hero) : Observable<Hero>{
    const heroUrl = this.heroesUrl + '/' + hero.id;
    return this.http.put<Hero>(heroUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  /** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}


searchHeroByName(term : string) : Observable<Hero[]>{
  const searchString = term.trim();
  if (searchString){
    const searchUrl = this.heroesUrl + '/?name=' + searchString;
    return this.http.get<Hero[]>(searchUrl).pipe(
      tap(heroArray => heroArray.length !== 0 ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  } else {
    return of([]);
  }
}

}


