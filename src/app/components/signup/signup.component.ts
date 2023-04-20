import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname :['', Validators.required],
     lastname  :['', Validators.required],
     email :['', Validators.required],
     username :['', Validators.required],
      password  :['', Validators.required]
    })
    }
  type: string="password";
  IsText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder,private auth: AuthService, private router:Router){}
hideShowPass()
{
 this.IsText= !this.IsText;
 this.IsText ? this.eyeIcon ="fa-eye" : this.eyeIcon="fa-eye-slash";
 this.IsText ? this.type="text" : this.type="password";  
}
onSignUp()
{
  if(this.signUpForm.valid){
//send to database
console.log(this.signUpForm.value)
this.auth.signUp(this.signUpForm.value)
.subscribe({
  next:(res=>{
    alert(res.message)
    this.signUpForm.reset()
    this.router.navigate(['login']);
  }),
  error:(err)=>{
    alert(err?.error.message)
  }
})
  }else{
  ValidateForm.validateAllFormFields(this.signUpForm);
  alert("Your form is invalid")
  }
}

} 