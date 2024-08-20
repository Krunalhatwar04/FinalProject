import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  // Get the current logged-in user details
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/users/all-users`);
  }

  // Generate JWT token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/Users/login`, loginData);
  }

  // Store the JWT token and user details in localStorage
  public loginUser(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  // Check if the user is logged in
  public isUserLoggedIn() {
    const tokenStr = localStorage.getItem('token');
    return !(tokenStr === undefined || tokenStr === '' || tokenStr === null);
  }

  // Remove token and user details from localStorage and navigate to login
  public removeTokenFromStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    return true;
  }

  // Get the JWT token from localStorage
  public getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }

  // Store user details in localStorage
  public setUserDetailsLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user details from localStorage
  public getUserDetailsFromLocalStorage() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Get user role from stored user details
  public getUserRole() {
    const user = this.getUserDetailsFromLocalStorage();
    console.log('Retrieved User Details: ', user);
    return user?.role || null; // Access role directly
  }
}
