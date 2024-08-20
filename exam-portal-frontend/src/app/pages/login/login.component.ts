import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {
    username: '',
    password: ''
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log("Login form submitted");

    if (!this.loginData.username.trim()) {
      this.snack.open("Username is required", "", {
        duration: 3000,
      });
      return;
    }

    if (!this.loginData.password.trim()) {
      this.snack.open("Password is required", "", {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Login successful");
        console.log(data);

        if (data && data.jwtToken && data.user) {
          // Login
          this.loginService.loginUser(data.jwtToken, data.user);
          
          // Check user role
          const userRole = this.loginService.getUserRole();

          if (userRole === "ADMIN") {
            this.router.navigate(['admin']);
          } else if (userRole === "USERS") {
            this.router.navigate(['user-dashboard']);
          } else {
            this.loginService.removeTokenFromStorage();
            this.snack.open("Invalid user role. Please contact support.", "", {
              duration: 3000
            });
          }

          // Update login status
          this.loginService.loginStatusSubject.next(true);
        } else {
          console.error("Unexpected data format:", data);
          this.snack.open("Unexpected response format. Please try again.", "", {
            duration: 3000
          });
        }
      },
      (error) => {
        console.error("Login failed:", error);
        this.snack.open("Login failed. Please try again.", "", {
          duration: 3000
        });
      }
    );
  }
}
