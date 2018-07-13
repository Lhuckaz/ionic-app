import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath: string = "https://api.themoviedb.org/3"
  private apiKey: string = "d2a844a19d1557a653c9c9bd073191d4"

  constructor(public http: HttpClient) {

  }

  getPopularMovie(page = 1) {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.apiKey);
  }

  getById(id) {
    return this.http.get(this.baseApiPath + `/movie/${id}?api_key=` + this.apiKey);
  }

}
