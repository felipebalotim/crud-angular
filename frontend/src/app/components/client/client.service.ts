import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Client } from './client.models';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'http://localhost:3001/clients';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  };

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e)),
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Occoreu um erro!', true);
    return EMPTY;
  }

  read(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }
  
  readById(id: string): Observable<Client> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }
  
  update(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
  }
  
  delete(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${client.id}`;
    return this.http.get<Client>(url);
  }
}
