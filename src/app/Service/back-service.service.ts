import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car.interfaz';

@Injectable({
  providedIn: 'root'
})
export class BackServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/api';
  login(credentials: any) {
    const url = `${this.apiUrl}/users/login`;
    return this.http.post(url, credentials);
  }
  getAllCars(): Observable<Car[]> {
    const tokenObject = JSON.parse(localStorage.getItem('token')!);
    const token = tokenObject?.token; // Extraer solo el valor del token
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/cars`;

    return this.http.get<Car[]>(url, { headers });
  }

  getCarsByUserId(userId: string): Observable<Car[]> {
    const url = `${this.apiUrl}/cars/user/${userId}/cars`;

    return this.http.get<Car[]>(url);
  }
}
