import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string="password";
  IsText:boolean=false;
  loginForm!:FormGroup;
  eyeIcon:string="fa-eye-slash";
  constructor(private fb: FormBuilder,private auth: AuthService,private router:Router){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
        username :['', Validators.required],
        password  :['', Validators.required]
    })
  }

hideShowPass()
{
   this.IsText= !this.IsText;
   this.IsText ? this.eyeIcon ="fa-eye" : this.eyeIcon="fa-eye-slash";
   this.IsText ? this.type="text" : this.type="password";  
}
onLogin()
{
  if(this.loginForm.valid){
//send to database
console.log(this.loginForm.value)
this.auth.login(this.loginForm.value)
.subscribe({
  next:(res=>{
    alert(res.message)
    this.loginForm.reset()
    this.router.navigate(['dashboard']);
  }),
  error:(err)=>{
    alert(err?.error.message)
  }
})
  }else{
  ValidateForm.validateAllFormFields(this.loginForm);
  alert("Your form is invalid")
  }
}

}
