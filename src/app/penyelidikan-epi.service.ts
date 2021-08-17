import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PenyelidikanEpiService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

}
