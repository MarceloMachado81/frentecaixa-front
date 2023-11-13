import { ItensVenda } from './../models/itensVenda';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  find(data: String): Observable<ItensVenda[]> {
    return this.http.get<ItensVenda[]>(`${API_CONFIG.baseUrl}/relatorios/${data}`);
  }
  
}