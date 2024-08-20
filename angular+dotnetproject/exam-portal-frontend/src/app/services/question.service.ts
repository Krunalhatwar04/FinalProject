import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }


  /**
   * getQuestionsByQuiz
   */
  public getQuestionsByQuiz(qid:any) {
    return this._http.get(`${baseUrl}/Questions/by-quiz/`+qid);
  }

  /**
   * addQuestion
   */
  public addQuestion(question:any) {
    return this._http.post(`${baseUrl}/Questions/`,question);
  }

  /*
   * delete
   */

  /**
   * deleteQuestion
   */
  public deleteQuestion(questionId:any) {
    return this._http.delete(`${baseUrl}/Questions/`+questionId)
  }


  /**
   * getQuestionsByQuiz
   */
   public getQuestionsByQuizforUser(qid:any) {
    return this._http.get(`${baseUrl}/Questions/by-quiz/`+qid);
  }

  /**
   * submitExam
   */
 /* public submitExam(questions:any) {
    return this._http.post(`${baseUrl}/Questions/submit-exam`,questions);
  }*/
    public submitExam(submitExamDto: { quizId: number; questions: { quesId: number; givenAnswer: string }[] }) {
      return this._http.post(`${baseUrl}/Questions/submit-exam`, submitExamDto);
    }
}
