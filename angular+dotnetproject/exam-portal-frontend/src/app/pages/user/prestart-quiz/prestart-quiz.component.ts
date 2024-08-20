import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestart-quiz',
  templateUrl: './prestart-quiz.component.html',
  styleUrls: ['./prestart-quiz.component.css']
})
export class PrestartQuizComponent implements OnInit {

  constructor(private _rout:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router) { }

  quizId !:number;

  quiz:any;
  ngOnInit(): void {
    this.quizId = Number(this._rout.snapshot.paramMap.get('quizId'));
    if (this.quizId) {
      this._quiz.getQuizById(this.quizId).subscribe(
        (data) => {
          this.quiz = data;
          console.log("Quiz data loaded successfully", this.quiz);
        },
        (error) => {
          console.log("Failed to load quiz", error);
        }
      );
    } else {
      console.error("Quiz ID is undefined or invalid");
    }
  }
  
/**
 * startQuiz
 */
public startQuiz() {

  Swal.fire({
    title:'Do you want to start Test',
    showCancelButton:true,
    confirmButtonText:"Yes, Start quiz"
  }).then((result)=>{
    if(result.isConfirmed){
      this._router.navigate(["/start/"+this.quizId])
      
    }
  })
  
}

  

}
