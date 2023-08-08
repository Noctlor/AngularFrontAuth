import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  constructor() { }
  private userRole?: string;
  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): any {
    return this.userRole;
  }
}
