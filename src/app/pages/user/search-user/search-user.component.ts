import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from '../userService/userService';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  
  users:User[] = [];
  loadingUser: boolean = false;
  
  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadingUser = true;
    this.userService.getAll()
    .pipe(map(responserData => {
      const usersArray = [];
      for (const key in responserData) {
        if (responserData.hasOwnProperty(key)) {
          usersArray.push({...responserData[key], id: key});  
        }
      }
      return usersArray;
    }))
    .subscribe(
     userData =>{
        this.loadingUser = false;
        this.users = userData;
    });
    } 
}
