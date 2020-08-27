import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-angular';
  password: string;
  email: string;

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('submitted success!');
    } else {
      return;
    }
  }
}
