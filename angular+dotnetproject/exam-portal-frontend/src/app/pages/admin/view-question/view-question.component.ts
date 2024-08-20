import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  qid = "";
  qtitle = "";
  question: any[] = []; // Initialize as an empty array

  constructor(
    private _rout: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.qid = this._rout.snapshot.params.qid;
    this.qtitle = this._rout.snapshot.params.qtitle;

    this.loadQuestions();
  }

  loadQuestions(): void {
    this._question.getQuestionsByQuiz(this.qid).subscribe(
      (data: any) => {
        // Check if data is an array or a single object
        if (Array.isArray(data)) {
          this.question = data;
        } else if (data && data.questions) {
          // If `data` has `questions` as a single object, wrap it in an array
          this.question = [data];
        } else {
          console.error('Unexpected data structure', data);
          this.question = []; // Ensure question is always an array
        }
        console.log(this.question);
      },
      (error) => {
        console.error(error);
        this.question = []; // Ensure question is always an array
      }
    );
  }

  delete(quesId: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      confirmButtonText: 'Yes, delete',
      showCancelButton: true,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(quesId).subscribe(
          () => {
            // Filter out the deleted question from the array
            this.question = this.question.filter((question: any) => question.quesId !== quesId);
            Swal.fire('Deleted!', 'The question has been deleted.', 'success');
          },
          (error: any) => {
            console.error(error);
            Swal.fire('Error!', 'An error occurred while deleting the question.', 'error');
          }
        );
      }
    });
  }
}
