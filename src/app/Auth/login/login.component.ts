import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { BackServiceService } from 'src/app/Service/back-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;
  constructor(
    private router: Router,
    private BackService:BackServiceService,
    private authService: AuthServiceService
    ) {}
  ngOnInit() {

    
  }
  onSubmit() {
    if (!this.email || !this.password) {
      console.log('Por favor ingresa usuario y contraseña');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password
    };
   this.BackService.login(credentials)
    .subscribe(
      (res: any) => {
        
        localStorage.setItem('token', JSON.stringify(res));

        


        this.router.navigate(['/dashboard']); 
      },
      (err: any) => {
        console.error(err);
      }
    ); 


  }




}
