import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable,of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService { 

private dataUrl = 'https://restcountries.eu/rest/v2/all';  // URL to web api

private list_dataSource = new BehaviorSubject<any[]>([]);
private selected_dataSource = new BehaviorSubject<any>({});


list_service = this.list_dataSource.asObservable();
selected_service = this.selected_dataSource.asObservable();


  constructor(private http: HttpClient) { }



    updateList(data: any[]) {
    this.list_dataSource.next(data);
  }

      updateSelected(data: any) {
    this.selected_dataSource.next(data);
  }




/** GET data from the server */
  getdata (): Observable<any[]> { 
    return this.http.get<any[]>(this.dataUrl)
          .pipe(
        tap(data => console.log(`fetched data`)),
        catchError(this.handleError('getdata', []))
      );
  }


 

   private handleError<T> (operation = 'operation', result?: T) { 
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
