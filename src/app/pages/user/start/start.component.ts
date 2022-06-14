import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;

  marksGot:any=0;
  correctAnswers:any=0;
  attempted:any=0;

  isSubmit=false;
  timer:any;




  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
  private _question:QuestionsService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions()
  {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>
      {
        this.questions=data;
        this.timer = this.questions.length*2*60;
        
          
        
        console.log(this.questions);
        this.startTimer();
      },
      (error:any)=>
      {
        console.log(error);
        Swal.fire('Error','Error in laoding data','error');
      }
    );
  }
  
  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'Submit',
      
      icon:`info`,
  }).then((e)=>
  {
    if(e.isConfirmed){

      this.evalQuiz();


    }
  });
}

startTimer()
{
  let t = window.setInterval(()=>{
    if(this.timer<=0)
    {
      this.evalQuiz(); 
      clearInterval(t);
    } else {
      this.timer--;
    }
  },1000)
}

getFormattedTime()
{
  let mm=Math.floor(this.timer/60);
  let ss=this.timer-mm*60;
  return `${mm} min : ${ss} sec`
}

//submit automatic 
evalQuiz(){

  this._question.evalQuiz(this.questions).subscribe(
    (data:any)=>{
      console.log(data);
      this.marksGot =  parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswers;
      this.attempted = data.attempted;
      this.isSubmit = true;
    },
    (error:any)=>
    {
      console.log(error);
    }
  );
  /*
  
  this.isSubmit=true;
         
  this.questions.forEach((q)=>
  {
    if(q.givenAnswer==q.answer)
    {
      this.correctAnswers++;
      let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
      this.marksGot+=marksSingle;
    } 
    console.log(this.correctAnswers);
    console.log(this.marksGot);
    if (q.givenAnswer.trim() != '') {
          this.attempted++;
      }
  }); 

*/

} 

printPage()
{
  window.print();
}


}
