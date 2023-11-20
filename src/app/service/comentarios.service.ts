import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comentarios } from '../model/Comentarios';
import { ComentariosMayor5DTO } from '../model/ComentariosMayor5DTO';


const base_url =environment.base
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url = `${base_url}/comentarios`
  private listaCambio = new Subject<Comentarios[]>()

  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Comentarios[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(per:Comentarios){
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url,per, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva:Comentarios[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id:number){
    let token = sessionStorage.getItem('token');
    return this.http.get<Comentarios>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(c:Comentarios){
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url,c, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id:number){
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getSuma(): Observable<ComentariosMayor5DTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ComentariosMayor5DTO[]>(`${this.url}/cantidadComentariosByUser`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
