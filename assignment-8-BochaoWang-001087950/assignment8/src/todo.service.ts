import {Injectable} from "@angular/core";
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { HAMMER_LOADER, ɵHAMMER_PROVIDERS__POST_R3__ } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Todo } from './todo';


@Injectable()
export class TodoService{
    constructor(private http:HttpClient){
        console.log("todo service init...")
    }
    getTodo(): Observable<Array<Todo>>{
        return this.http.get<Todo[]>("http://localhost:3000/todos");
    }
    get(id:String):Observable<Todo> {
        let todo$ = this.http.get<Todo>('http://localhost:3000/todos/'+id);
        return todo$;
      }
    addTodo(newTodo):Observable<Array<Todo>>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.post<Todo[]>("http://localhost:3000/todos",
         JSON.stringify(newTodo),
         httpOptions);
        //  .subscribe((response)=>{
        //      console.log(response);
        //      alert("add successfully")
        //  });
    }

    deleteTodo(id:String){
        return this.http.delete('http://localhost:3000/todos/'+id);
    }

    updateStatus(todo){
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.put('http://localhost:3000/todos/'+todo._id,
        JSON.stringify(todo),
        httpOptions
        );
    }

    updateTodo(todo){
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.put('http://localhost:3000/todos/'+todo._id,
        JSON.stringify(todo),
        httpOptions
        );
    }
}