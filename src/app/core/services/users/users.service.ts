import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBase } from '../../../shared/response-base';
import { UserInputDto, UserOutputDto } from '../../models/users/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly USER_URL = 'http://localhost:5000' + '/api/v1/sisand-test/users';

  constructor(private httpClient : HttpClient) { }

  getAllAsync(filter?:string): Observable<ResponseBase<UserOutputDto[]>>
  {
    let params = new HttpParams().append('Limit', 50);

    if(filter)
        params = params.append('Filter', filter); 
    
    return this.httpClient.get<ResponseBase<UserOutputDto[]>>(`${this.USER_URL}`, {params});
  }

  getByIdAsync(userId: number): Observable<ResponseBase<UserOutputDto>> 
  {
    return this.httpClient.get<ResponseBase<UserOutputDto>>(`${this.USER_URL}/${userId}`);
  }

  updateAsync(userId: number, userToUpdate: UserInputDto): Observable<ResponseBase<UserOutputDto>>
  {
    return this.httpClient.put<ResponseBase<UserOutputDto>>(`${this.USER_URL}/${userId}`, userToUpdate);
  }

  insertAsync(userToInsert: UserInputDto): Observable<ResponseBase<UserOutputDto>>
  {
    return this.httpClient.post<ResponseBase<UserOutputDto>>(`${this.USER_URL}`, userToInsert);
  }

  deleteByIdAsync(userId: number): Observable<any> 
  {
    return this.httpClient.delete<any>(`${this.USER_URL}/${userId}`);
  }
}

