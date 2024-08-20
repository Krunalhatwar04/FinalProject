// // import { LocationStrategy } from '@angular/common';
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { QuestionService } from 'src/app/services/question.service';
// // import Swal from 'sweetalert2';

// // @Component({
// //   selector: 'app-start-quiz',
// //   templateUrl: './start-quiz.component.html',
// //   styleUrls: ['./start-quiz.component.css']
// // })
// // export class StartQuizComponent implements OnInit {

// //   constructor(private _rout: ActivatedRoute,
// //     private _locationSta: LocationStrategy,
// //     private _questions: QuestionService) { }

// //     quizId !: number
// //   question: any=[];

// //   marksGot = 0;
// //   correctAnswer = 0;
// //   attempted = 0;

// //   isSubmit = false;
// //   timer: any;






// //   ngOnInit(): void {

// //     this.quizId = this._rout.snapshot.params['quizId'];
// //     console.log('Quiz ID:', this.quizId); 

// //     this.blockBackButton();

// //     this.loadQuiz();



  






// //   }

// //   /**
// //    * loadQuiz
// //    */
// //   public loadQuiz() {
// //     this._questions.getQuestionsByQuizforUser(this.quizId).subscribe((data) => {
      


// //       this.question = data;
// //       console.log("data",data)
// //       //time calculate
// //       this.timer = this.question.length * 2 * 60;

// //       this.countdown();

     



// //     },

// //       (error) => {
// //         console.log(error)
// //       })

// //   }

// //   blockBackButton() {
// //     history.pushState(null, '', location.href);

// //     this._locationSta.onPopState(() => {
// //       history.pushState(null, '', location.href);
// //     })
// //   }



// //   submitQuiz() {
// //     Swal.fire({
// //       title: 'Do you want to start Submit ?',
// //       showCancelButton: true,
// //       confirmButtonText: "Yes, Submit",
// //       icon: 'info'
// //     }).then((result) => {
// //       if (result.isConfirmed) {


// //         this.calculateSubmitForBackend();



// //       }
// //     })
// //   }


// //   calculateSubmitForBackend(){
// //       this._questions.submitExam(this.question).subscribe(
// //         (data:any)=>{
// //           console.log(data);

// //           this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
// //           this.correctAnswer=data.correctAnswers;
// //           this.attempted=data.attempted;
// //           this.isSubmit=true;
// //         },
// //         (error)=>{
// //           console.log(error)
// //         }
// //       )
// //   }

// //   calculateSubmitForFrontEnd() {
// //     this.isSubmit = true;
// //     this.question.forEach((q: any) => {


// //       if (q.givenAnswer == q.answer) {
// //         this.correctAnswer++;

// //         let marksCurrent = this.question[0].quiz.maxMax / this.question.length;

// //         this.marksGot += marksCurrent;


// //       }

// //       if (q.givenAnswer.trim() != '') {
// //         this.attempted++;
// //       }




// //     });
// //   }


// //   countdown(){
// //    let t:any= window.setInterval(()=>{
// //       if(this.timer<=0){
// //         this.calculateSubmitForBackend();
// //         clearInterval(t);
// //       }else{
// //         this.timer--;
// //       }
// //     },1000)
// //   }


// //   formatTime(){
// //     let m=Math.floor(this.timer/60);

// //     let s=this.timer-m*60;
// //     return `${m} min : ${s} sec.`
// //   }


// //   printPage(){
// //     window.print();
// //   }
// // }

// import { LocationStrategy } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { QuestionService } from 'src/app/services/question.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-start-quiz',
//   templateUrl: './start-quiz.component.html',
//   styleUrls: ['./start-quiz.component.css']
// })
// export class StartQuizComponent implements OnInit {

//   constructor(private _rout: ActivatedRoute,
//               private _locationSta: LocationStrategy,
//               private _questions: QuestionService) { }

//   quizId!: number;
//   question: any = [];
//   questionResults: any[] = [];
//   marksGot = 0;
//   correctAnswer = 0;
//   attempted = 0;

//   isSubmit = false;
//   timer: any;

//   ngOnInit(): void {
//     this.quizId = this._rout.snapshot.params['quizId'];
//     console.log('Quiz ID:', this.quizId); 

//     this.blockBackButton();

//     this.loadQuiz();
//   }

//   public loadQuiz() {
//     this._questions.getQuestionsByQuizforUser(this.quizId).subscribe((data) => {
//       this.question = data;
//       console.log("data", data);
//       this.timer = this.question.length * 2 * 60; // assuming 2 minutes per question
//       this.countdown();
//     },
//     (error) => {
//       console.log(error);
//     });
//   }

//   blockBackButton() {
//     history.pushState(null, '', location.href);
//     this._locationSta.onPopState(() => {
//       history.pushState(null, '', location.href);
//     });
//   }

//   submitQuiz() {
//     Swal.fire({
//       title: 'Do you want to start Submit?',
//       showCancelButton: true,
//       confirmButtonText: "Yes, Submit",
//       icon: 'info'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.calculateSubmitForBackend();
//       }
//     });
//   }

//   calculateSubmitForBackend() {
//     const submitExamDto = {
//       quizId: this.quizId,
//       questions: this.question.map((q: any) => ({
//         quesId: q.quesId,
//         givenAnswer: q.givenAnswer || ''
//       }))
//     };
  
//     this._questions.submitExam(submitExamDto).subscribe(
//       (data: any) => {
//         console.log(data);
//         this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
//         this.correctAnswer = data.correctAnswers;
//         this.attempted = data.attempted;
//         this.questionResults = data.questionResults;
//         this.isSubmit = true;
//         console.log("data.questionResults",data.questionResults);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

//   calculateSubmitForFrontEnd() {
//     this.isSubmit = true;
//     this.question.forEach((q: any) => {
//       if (q.givenAnswer === q.answer) {
//         this.correctAnswer++;
//         // Calculate marks based on the number of correct answers
//         let marksCurrent = 100 / this.question.length; // Assuming total marks are 100
//         this.marksGot += marksCurrent;
//       }
//       if (q.givenAnswer.trim() !== '') {
//         this.attempted++;
//       }
//     });
//   }

//   countdown() {
//     let t: any = window.setInterval(() => {
//       if (this.timer <= 0) {
//         this.calculateSubmitForBackend();
//         clearInterval(t);
//       } else {
//         this.timer--;
//       }
//     }, 1000);
//   }

//   formatTime() {
//     let m = Math.floor(this.timer / 60);
//     let s = this.timer - m * 60;
//     return `${m} min : ${s} sec.`;
//   }

//   printPage() {
//     window.print();
//   }
// }


// import { LocationStrategy } from '@angular/common';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { QuestionService } from 'src/app/services/question.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-start-quiz',
//   templateUrl: './start-quiz.component.html',
//   styleUrls: ['./start-quiz.component.css']
// })
// export class StartQuizComponent implements OnInit, OnDestroy {

//   constructor(private _rout: ActivatedRoute,
//               private _locationSta: LocationStrategy,
//               private _questions: QuestionService) { }

//   quizId!: number;
//   question: any = [];
//   questionResults: any[] = [];
//   marksGot = 0;
//   correctAnswer = 0;
//   attempted = 0;

//   isSubmit = false;
//   timer: any;

//   ngOnInit(): void {
//     this.quizId = this._rout.snapshot.params['quizId'];
//     console.log('Quiz ID:', this.quizId); 

//     this.blockBackButton();
//     this.loadQuiz();

//     // Add event listener for visibility change
//     document.addEventListener('visibilitychange', this.handleVisibilityChange);
//   }

//   ngOnDestroy(): void {
//     // Clean up event listener when the component is destroyed
//     document.removeEventListener('visibilitychange', this.handleVisibilityChange);
//   }

//   public loadQuiz() {
//     this._questions.getQuestionsByQuizforUser(this.quizId).subscribe((data) => {
//       this.question = data;
//       console.log("data", data);
//       this.timer = this.question.length * 2 * 60; // assuming 2 minutes per question
//       this.countdown();
//     },
//     (error) => {
//       console.log(error);
//     });
//   }

//   blockBackButton() {
//     history.pushState(null, '', location.href);
//     this._locationSta.onPopState(() => {
//       history.pushState(null, '', location.href);
//     });
//   }

//   submitQuiz() {
//     Swal.fire({
//       title: 'Do you want to start Submit?',
//       showCancelButton: true,
//       confirmButtonText: "Yes, Submit",
//       icon: 'info'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.calculateSubmitForBackend();
//       }
//     });
//   }

//   calculateSubmitForBackend() {
//     const submitExamDto = {
//       quizId: this.quizId,
//       questions: this.question.map((q: any) => ({
//         quesId: q.quesId,
//         givenAnswer: q.givenAnswer || ''
//       }))
//     };
  
//     this._questions.submitExam(submitExamDto).subscribe(
//       (data: any) => {
//         console.log(data);
//         this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
//         this.correctAnswer = data.correctAnswers;
//         this.attempted = data.attempted;
//         this.questionResults = data.questionResults;
//         this.isSubmit = true;
//         console.log("data.questionResults", data.questionResults);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

//   calculateSubmitForFrontEnd() {
//     this.isSubmit = true;
//     this.question.forEach((q: any) => {
//       if (q.givenAnswer === q.answer) {
//         this.correctAnswer++;
//         // Calculate marks based on the number of correct answers
//         let marksCurrent = 100 / this.question.length; // Assuming total marks are 100
//         this.marksGot += marksCurrent;
//       }
//       if (q.givenAnswer.trim() !== '') {
//         this.attempted++;
//       }
//     });
//   }

//   countdown() {
//     let t: any = window.setInterval(() => {
//       if (this.timer <= 0) {
//         this.calculateSubmitForBackend();
//         clearInterval(t);
//       } else {
//         this.timer--;
//       }
//     }, 1000);
//   }

//   formatTime() {
//     let m = Math.floor(this.timer / 60);
//     let s = this.timer - m * 60;
//     return `${m} min : ${s} sec.`;
//   }

//   printPage() {
//     window.print();
//   }

//   handleVisibilityChange = () => {
//     if (document.hidden) {
//       this.endQuiz();
//     }
//   }

//   endQuiz() {
//     Swal.fire({
//       title: 'Quiz ended!',
//       text: 'You have been redirected because you switched tabs or minimized the browser.',
//       icon: 'warning'
//     }).then(() => {
//       this.calculateSubmitForBackend();
//     });
//   }
// }


import { LocationStrategy } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit, OnDestroy {

  constructor(private _rout: ActivatedRoute,
              private _locationSta: LocationStrategy,
              private _questions: QuestionService) { }

  quizId!: number;
  question: any = [];
  questionResults: any[] = [];
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  isSubmit = false;
  timer: any;

  ngOnInit(): void {
    this.quizId = this._rout.snapshot.params['quizId'];
    console.log('Quiz ID:', this.quizId); 

    this.blockBackButton();
    this.loadQuiz();

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  ngOnDestroy(): void {
    // Clean up event listener when the component is destroyed
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  public loadQuiz() {
    this._questions.getQuestionsByQuizforUser(this.quizId).subscribe((data) => {
      this.question = data;
      console.log("data", data);
      this.timer = this.question.length * 2 * 60; // assuming 2 minutes per question
      this.countdown();
    },
    (error) => {
      console.log(error);
    });
  }

  blockBackButton() {
    history.pushState(null, '', location.href);
    this._locationSta.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to start Submit?',
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.calculateSubmitForBackend();
      }
    });
  }

  calculateSubmitForBackend() {
    const submitExamDto = {
      quizId: this.quizId,
      questions: this.question.map((q: any) => ({
        quesId: q.quesId,
        givenAnswer: q.givenAnswer || ''
      }))
    };
  
    this._questions.submitExam(submitExamDto).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer = data.correctAnswers;
        this.attempted = data.attempted;
        this.questionResults = data.questionResults;
        this.isSubmit = true;
        console.log("data.questionResults", data.questionResults);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateSubmitForFrontEnd() {
    this.isSubmit = true;
    let totalQuestions = this.question.length;
    let marksPerQuestion = 2; // Marks for each question
    this.marksGot = 0; // Reset marks
  
    this.question.forEach((q: any) => {
      if (q.givenAnswer === q.answer) {
        this.correctAnswer++;
        this.marksGot += marksPerQuestion; // Add marks for correct answer
      }
      if (q.givenAnswer.trim() !== '') {
        this.attempted++;
      }
    });
  
    // Optionally, display total marks
    console.log(`Total Marks: ${this.marksGot}`);
  }

  countdown() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.calculateSubmitForBackend();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  formatTime() {
    let m = Math.floor(this.timer / 60);
    let s = this.timer - m * 60;
    return `${m} min : ${s} sec.`;
  }

  printPage() {
    window.print();
  }

  handleVisibilityChange = () => {
    if (document.hidden) {
      this.showTabSwitchAlert();
    }
  }

  showTabSwitchAlert() {
    Swal.fire({
      title: 'You have switched tabs!',
      text: 'Please stay on this tab to complete the quiz.',
      icon: 'warning'
    });
  }
}
