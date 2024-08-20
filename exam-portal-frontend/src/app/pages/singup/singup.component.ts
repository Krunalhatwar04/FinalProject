import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router // Inject Router
  ) {}

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);

    if (!this.user.userName.trim()) {
      this.snack.open('Username is required and cannot be empty!', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.user.password.trim()) {
      this.snack.open('Password is required and cannot be empty!', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.user.firstName.trim()) {
      this.snack.open('First name is required and cannot be empty!', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.user.lastName.trim()) {
      this.snack.open('Last name is required and cannot be empty!', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.user.email.trim()) {
      this.snack.open('Email is required and cannot be empty!', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.user.phoneNumber.trim()) {
      this.snack.open('Phone number is required and cannot be empty!', '', {
        duration: 3000,
      });
      return;
    }

    const namePattern = /^[a-zA-Z ]*$/;

    if (!namePattern.test(this.user.userName)) {
      this.snack.open('Username cannot contain numbers or special characters!', '', {
        duration: 3000,
      });
      return;
    }

    if (!namePattern.test(this.user.firstName)) {
      this.snack.open('First name cannot contain numbers or special characters!', '', {
        duration: 3000,
      });
      return;
    }

    if (!namePattern.test(this.user.lastName)) {
      this.snack.open('Last name cannot contain numbers or special characters!', '', {
        duration: 3000,
      });
      return;
    }

    // If all validations pass, proceed with form submission
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Successfully done !!', 'User id is ' + data.UserId, 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']); // Navigate to login after successful sign-up
          }
        });
      },
      (error) => {
        console.log(error);
        this.snack.open(error.error.text, '', {
          duration: 3000, 
        });
      }
    );
  }
}
