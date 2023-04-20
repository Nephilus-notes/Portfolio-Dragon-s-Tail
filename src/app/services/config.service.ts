import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getConfig() {
    // return this.http.get<Config>(this.configUrl);
  }

  configUrl = 'assets/config.json';
}
