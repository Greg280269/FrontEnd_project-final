import { Injectable } from '@angular/core';
import { JwtRequest } from '../model/JwtRequest';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: JwtRequest) {
    return this.http.post("https://evt-service.onrender.com/authenticate", request);
  }
  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;

  }
  showRole(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
