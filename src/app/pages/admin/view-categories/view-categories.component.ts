import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories=[
    {
      cid: '',
      title:'',
      description:' '
    },
    
  ];

  constructor(private _category:CategoryService,private _quiz:QuizService) { }

  ngOnInit(): void { 

    this._category.categories().subscribe(
      (data:any)=>
      {
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>
      {
        console.log("error");
        Swal.fire("Error!!",'Error in loading data','error');
      }
    );
  }
  ////delete category 
  deleteCategory(cid:any)
  {
     Swal.fire({
        icon:'info',
        title:"Are you sure?",
        confirmButtonText: 'Delete',
        showCancelButton: true,
     }).then((result)=> {
        
       if(result.isConfirmed) {
        this._quiz.deleteCategory(cid).subscribe(
          (data:any)=>{
           this.categories=this.categories.filter((quiz)=>quiz.cid!=cid)
          Swal.fire('Success','Successfully Deleted','success');
         },
         (error)=>{
           Swal.fire('Error','Error in deleting','error');
         }
        );
       }
       });

     }

}
