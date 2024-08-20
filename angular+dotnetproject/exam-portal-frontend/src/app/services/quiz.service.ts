import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  public getQuizzes() {
    return this._http.get(`${baseUrl}/Quiz/`);
  }

  public addNewQuiz(quizData: any) {
    return this._http.post(`${baseUrl}/Quiz/`, quizData);
  }

  public deleteQuizById(quizId: any) {
    return this._http.delete(`${baseUrl}/Quiz/${quizId}`);
  }

  public getQuizById(quizId: any) {
    return this._http.get(`${baseUrl}/Quiz/${quizId}`);
  }

  // public updateQuiz(quizId: any) {
  //   return this._http.put(`${baseUrl}/Quiz/`, quizId);
  // }
  public updateQuiz(quizId: any, quizData: any) {
    return this._http.put(`${baseUrl}/Quiz/${quizId}`, quizData);
  }

  public getQuizzesByCategory(cid: any) {
    return this._http.get(`${baseUrl}/Quiz/category/${cid}`);
  }

  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/Quiz/`);
  }

  public getActiveQuizzesByCategory(cid: any) {
    return this._http.get(`${baseUrl}/Quiz/category/${cid}`);
  }
  
}
