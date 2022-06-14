import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  static getQuiz(qId: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http:HttpClient) { }

  public quizzes()
  {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any)
  {
    return  this._http.post(`${baseUrl}/quiz/` ,quiz);
  }

  //delete quiz
  public deleteQuiz(qId:any)
  {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }
  
// get single quiz
  public getQuiz(qId:any)
  {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz: any)
  {
    return this._http.put(`${baseUrl}/quiz/` ,quiz);
  }

  public getQuizzesOfCategory(cid:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }
  
  public getActiveQuizzes()
  {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizzesOfCategory(cid:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  ////delete category
  public deleteCategory(cid:any)
  {
    return this._http.delete(`${baseUrl}/category/${cid}`);
  }


  
}
