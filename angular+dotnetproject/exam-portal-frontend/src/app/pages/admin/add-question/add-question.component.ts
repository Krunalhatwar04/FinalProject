// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { QuestionService } from 'src/app/services/question.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-add-question',
//   templateUrl: './add-question.component.html',
//   styleUrls: ['./add-question.component.css']
// })
// export class AddQuestionComponent implements OnInit {

//   constructor(private _router: ActivatedRoute,
//     private _question:QuestionService,
//     private _rout:Router) { }

//   qid = "";
//   qtitle="";


//   question={
//     quiz:{
//       qid:''
//     },
//     content:'',
//     option1:'',
//     option2:'',
//     option3:'',
//     option4:'',
//     answer:''
//   }

//   ngOnInit(): void {

//     this.qid = this._router.snapshot.params.qid;
//     this.qtitle = this._router.snapshot.params.qtitle;

//     this.question.quiz['qid']=this.qid;

    

//   }


//   addQuestion(){
//     this._question.addQuestion(this.question).subscribe((data:any)=>{
//       Swal.fire("Success","Question addedd to "+this.qtitle+" successfully",'success').then((e)=>{
//         this._rout.navigate(['/admin/question/'+this.qid+'/'+this.qtitle]);
      
//       })
//     }),
//     (error:any)=>{
//       Swal.fire("Faild","Question proccess faild",'error');
        
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(
    private _router: ActivatedRoute,
    private _question: QuestionService,
    private _rout: Router
  ) { }

  qid = "";
  qtitle = "";

  // Aligning with the backend schema
  question = {
    questions: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quizId: 0  // Will be set to qid in ngOnInit
  }

  ngOnInit(): void {
    this.qid = this._router.snapshot.params['qid'];
    this.qtitle = this._router.snapshot.params['qtitle'];

    // Set the quizId from the route params
    this.question.quizId = +this.qid;  // Converting string to number
  }

  addQuestion() {
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire("Success", `Question added to ${this.qtitle} successfully`, 'success')
          .then(() => {
            this._rout.navigate(['/admin/question/' + this.qid + '/' + this.qtitle]);
          });
      },
      (error: any) => {
        Swal.fire("Failed", "Question process failed", 'error');
      }
    );
  }
}
