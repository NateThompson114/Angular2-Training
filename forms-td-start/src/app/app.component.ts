import { Component, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form1', { static: false }) form1: NgForm;
  defaultValue = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form1.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
    // this.form1.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  onSubmit() {
    console.log(this.form1);
    this.user.username = this.form1.value.userData.username;
    this.user.email = this.form1.value.userData.email;
    this.user.secretQuestion = this.form1.value.secret;
    this.user.answer = this.form1.value.questionAnswer;
    this.user.gender = this.form1.value.gender;
    this.submitted = true;

    this.form1.reset();
  }

}
