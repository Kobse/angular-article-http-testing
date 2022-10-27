import { MessageService } from './message.service';
import { Article } from './../../shared/models/article';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articlesURL = 'http://localhost:4200/articles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesURL).pipe(
      tap((_) => console.log('fetched articles')),
      catchError(this.handleError<Article[]>('getAllArticles', []))
    );
  }

  postArticle(newArticle: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesURL, newArticle);
  }

  getArticle(id: any): Observable<Article> {
    const url = `${this.articlesURL}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap((_) => this.log(`fetched article with id=${id}`)),
      catchError(this.handleError<Article>(`getArticle ud=${id}`))
    );
  }

  updateArticle(updatedArticle: Article): Observable<any> {
    const url = `${this.articlesURL}/${updatedArticle.id}`;
    return this.http.put<Article>(url, updatedArticle, this.httpOptions).pipe(
      tap((_) => console.log('Article updated')),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  deleteArticle(id: any): Observable<Article> {
    const url = `${this.articlesURL}/${id}`;

    return this.http
      .delete<Article>(url)
      .pipe(tap((_) => console.log(`deleted article id=${id}`)));
  }

  /**
   * Handle Http operation that failed
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - option value to return as the observable result
   * @returns - empty result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Send error to remote logging infrastructure
      console.error(error);
      // Transforming error for a better error message for the user
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.addMessage(`ArticleService: ${message}`);
  }
}
