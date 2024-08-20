// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quizCount: number = 0;
  userCount: number = 0;
  adminCount: number = 0;
  categoryCount: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.fetchCounts();
  }

  // fetchCounts() {
  //   this.userService.getQuizCount().subscribe(count => this.quizCount = count);
  //   this.userService.getUserCount().subscribe(count => this.userCount = count);
  //   this.userService.getAdminCount().subscribe(count => this.adminCount = count);
  //   this.userService.getCategoryCount().subscribe(count => this.categoryCount = count);
  // }
}
