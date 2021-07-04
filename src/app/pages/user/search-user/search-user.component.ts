import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../userService/userService';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  
  users:any[] = [];
  
  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getAll()
    .pipe()
    .subscribe(
     userData =>{
        this.users = userData;
    });
    }

    // Edit(id:number){
    //   this.userService.getId(id)
    //   .pipe()
    //   .subscribe(
    //     userData => {
    //       // console.log(userData);
    //       if(userData){
    //         this.router.navigate([`user/create-user/${id}`]);
    //       }
    //     }
    //   )
    // }
  
}
