import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any =[];

  constructor(private _route:ActivatedRoute,
    private _question:QuestionsService,
    private _snack:MatSnackBar) { }

  ngOnInit(): void {

    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>
      {
        console.log(data);
        this.questions=data;
      },
      (error:any)=>
      {
        console.log(error); 
      }

    );
  }
  deleteQuestion(qid:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure,want to delete?',})

    .then((result)=> {
      if(result.isConfirmed)
      {
        this._question.deleteQuestion(qid).subscribe(
        (data)=>
        {
          this._snack.open('Question deleted','',{
            duration:3000,
          });
          this.questions=this.questions.filter((q:any)=>q.quesId!=qid);
        },
       
        (errora:any)=>
        { 
              this._snack.open('Error in deleteing Question','',{
                duration:3000,
              });
        });
      }
    })
  }

  updateQuestion(qid:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Update',
      title:'Are you sure,want to Update?',})
      .then
  }
  


}
