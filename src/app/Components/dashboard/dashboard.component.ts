import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { BackServiceService } from 'src/app/Service/back-service.service';
import { Car } from 'src/app/interfaces/car.interfaz';

import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment.development';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole?: string;

  cars: Car[] = [];
  userCars: Car[] = [];
  minimapPosicion: { latitud: number; longitud: number } = { latitud: 0, longitud: 0 };

  constructor(
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService,
    private back:BackServiceService
     ) {}


  ngOnInit() {



    const token:any = localStorage.getItem('token');

    // Decodificar el token para obtener los datos del usuario, incluido el rol
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.userRole = decodedToken.role;
    
    const userId = decodedToken.userId;
    
    if (this.userRole === 'admin') {
      this.loadCars();
    } else {
      this.loadUserCars(userId);
    }


   
  }
  isAdmin(): boolean {
    
    return this.userRole === 'admin';
  }

  loadCars() {
    this.back.getAllCars().subscribe(
      (cars: Car[]) => {
          this.cars = cars;
          if (this.cars.length > 0 && this.cars[0].posicion) {
            // Asignamos la posición del primer carro a la propiedad Posicion
            this.minimapPosicion = this.cars[0].posicion;
          }
        },
      (error) => {
        console.error('Error al obtener los carros', error);
      }
    );
  }

  
  loadUserCars(userId: string) {
    this.back.getCarsByUserId(userId).subscribe(
      (userCars: Car[]) => {
        this.userCars = userCars;
        console.log(this.minimapPosicion)
        if (this.cars.length > 0 && this.userCars[0].posicion) {
          console.log(this.userCars)
          this.minimapPosicion = this.userCars[0].posicion;
        }
      },
      (error) => {
        console.error('Error al obtener los carros del usuario', error);
      }
    );
  }
}