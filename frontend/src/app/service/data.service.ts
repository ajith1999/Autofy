import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(jsonBody: any) {
    console.log(jsonBody);
    const url = 'http://localhost:3000/api/v1/faker';
    return this.http.put(url, jsonBody).pipe(
      map((responseData: any) => {
        return responseData;
      })
    );
  }
}
