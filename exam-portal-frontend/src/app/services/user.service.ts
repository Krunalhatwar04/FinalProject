import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
    
   }

  /**
   * addUser
   */
  public addUser(user:any) {
    return this.http.post(`${baseUrl}/Users/register`,user)
  }
  public getQuizCount() {
    return this.http.get<number>(`${baseUrl}/Users/quizzes/count`);
  }

  // Method to get the count of users
  public getUserCount() {
    return this.http.get<number>(`${baseUrl}/Users/users/count`);
  }

  // Method to get the count of admins
  public getAdminCount() {
    return this.http.get<number>(`${baseUrl}/Users/admins/count`);
  }

  // Method to get the count of categories
  public getCategoryCount() {
    return this.http.get<number>(`${baseUrl}/Users/categories/count`);
  }

 
}
