import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
public Editor =ClassicEditor;
question={
  quiz: {
    qId:'',
    qTitle:'',
  },
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
};
  qId:any;
  qTitle:any;

  constructor(private _route:ActivatedRoute,
              private _question:QuestionsService) { }

  ngOnInit(): void {
  
  this.qId = this._route.snapshot.params['qid'];
  this.qTitle=this._route.snapshot.params['title'];
  console.log(this.qTitle);
  console.log(this.qId);
  this.question.quiz['qId'] = this.qId; 
  }
  formSubmit()
  {
    if(this.question.content.trim()=='' || this.question.content==null)
    {
       return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      return;
    }
    //form submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>
    {
      Swal.fire('Success','Quesstion Added','success');
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
      this.question.answer='';
    },
    (error:any)=>
    { 
      Swal.fire('Error','Error in adding question','error');
    }
    );
    
  }
}
