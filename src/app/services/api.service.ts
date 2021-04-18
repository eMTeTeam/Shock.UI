import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { apiLinks, environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  doLogin = (params: any) => {
  }

  logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isSuperUser");
  }
  GetAllObservations = (user: string): Observable<any> => {
    const url = apiLinks.GetAllObservations + '?user=' + user;
    return this.http.get(url);
  }
  AddObservation = (params: any): Observable<any> => {
    const url = apiLinks.AddObservation;
    return this.http.post(url, params);
  }
  updateObservation = (params: any): Observable<any> => {
    const url = apiLinks.UpdateObservation;
    return this.http.post(url, params);
  }
  insertEntity = (params: any): Observable<any> => {
    const endpoint = 'AddQualityDetail';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
  }

  updateEntity = (params: any): Observable<any> => {
    const endpoint = 'Update';
    const url = environment.baseURL + endpoint;
    return this.http.post(url, params);
  }

  loadRecentSerialNo = (user: string): Observable<any> => {
    const endpoint = 'GetMaxCount';
    const url = environment.baseURL + endpoint + '?user=' + user;
    return this.http.get(url);
  }

  loadAllEntity = (params: any): Observable<Array<any>> => {
    const endpoint = 'FilteredItems';
    const url = environment.baseURL + endpoint;
    return this.http.post<Array<any>>(url, params);
  }

  getExcelReport = (params: any): Observable<HttpResponse<ArrayBuffer>> => {
    const endpoint = 'healthmeasures/v1/generateReport';
    const url = environment.baseURL + endpoint;
    return this.http.put(url, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/octet-stream',
      }),
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }
}
