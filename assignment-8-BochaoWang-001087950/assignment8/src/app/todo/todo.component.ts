import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../todo.service';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {Todo} from '../../todo';
import {DetailsComponent} from '../details/details.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Array<Todo>;
  title: String;
  description : String;
  duedate: String;

  constructor(private todoService : TodoService,private detailsComponent:DetailsComponent){
      this.todoService.getTodo().subscribe(todos =>{
        console.log(todos);
        this.todos = todos;
      });
    }
  
    addTodo(){
      //console.log(this.title);
      var newTodo={
        title:this.title,
        description: this.description,
        duedate:this.duedate,
        modifiedDate:new Date(),
        isdone:false
      }
      //this.todos.push(newTodo);
      this.todoService.addTodo(newTodo)
        .subscribe(todo => {
          this.todoService.getTodo().subscribe(todos =>{
            console.log(todos);
            this.todos = todos;
            location.reload();
          });
          this.title='';
          this.description='';
          this.duedate='';
          
        })
        alert('add successfully!');

    }
    deleteTodo(id){
      var todos = this.todos;
      if(confirm('are you sure to delete?')){
        this.todoService.deleteTodo(id).subscribe(data =>{
          for(var i = 0;i<todos.length;i++){
            if(todos[i]._id == id){
              todos.splice(i,1);
              window.location.href="";
              
            }
          }
      })
      alert('delete successfully!');
      }
      
      
    }

    updateStatus(todo){
      var _todo = {
        _id:todo._id,
        title:todo.title,
        description:todo.description,
        duedate:todo.duedate,
        modifiedDate:new Date(),
        isdone:!todo.isdone
      };
      this.todoService.updateStatus(_todo)
      .subscribe(data =>{
        todo.isdone = !todo.isdone;
        //this.detailsComponent.ngOnInit();
        location.reload();
      });
    }

    updateTodo(todo){
      var todos = this.todos;
      console.log(this.title);
      if(this.title=='' || this.title==undefined){
        alert("title is empty!");
        return;
      }
      if(this.description=='' ||this.description==undefined){
        alert("description is empty!");
        return;
      }
      if(this.duedate=='' || this.duedate==undefined){
        alert('due date is empty!');
        return;
      }

      var _todo={
        _id:todo._id,
        title:this.title,
        description: this.description,
        duedate:this.duedate,
        modifiedDate:new Date(),
        isdone:todo.isdone
      }

      this.todoService.updateTodo(_todo)
      .subscribe(data =>{
        // todo.title = this.title;
        // todo.description = this.description;
        // todo.duedate = this.duedate;
        // todo.modifiedDate=new Date();
        this.todoService.getTodo().subscribe(todos =>{
          console.log(todos);
          this.todos = todos;
          location.reload();
        });
      });


    }

  ngOnInit(): void {
  }
}




