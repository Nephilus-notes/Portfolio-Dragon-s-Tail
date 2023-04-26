import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']

})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}

  text: string = "user";

  giveMeTheUser(): void {
this.auth.user$.subscribe(user => {
  console.warn(user)
  console.warn(user?.sub)
})
  }
}