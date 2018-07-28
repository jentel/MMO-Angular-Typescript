import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private heroesURL = 'api/heroes';

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: update to send error to remote logging
      console.error(error);
  
      // TODO: better job of transforming error for consumption - blah
      this.log(`${operation} failed: ${error.message}`);
  
      // Keep app running with bad error handling
      return of(result as T);
    }
  }

  getHeroes() : Observable<Hero[]> {
    //this.messageService.add('HeroService: fetched heroes');
    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesURL).pipe(catchError(this.handleError('getHeroes', [])));
  }

  getHero(id: number) : Observable<Hero> {
    // this.messageService.add(`HeroService: fetched hero id=${id}`); // not single quotes
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesURL}${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)),catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  // PUT call
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, httpOptions).pipe(tap(_ => this.log(`updated hero id=${hero.id}`)),catchError(this.handleError<any>('updateHero')));
  }

  // POST call
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesURL, hero, httpOptions).pipe(tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero')));
  }

  // DELETE call
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesURL}/${id}`;
 
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // GET call
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesURL}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

   /** GET hero by id. Return `undefined` when id not found */
   getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

