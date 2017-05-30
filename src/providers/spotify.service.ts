import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class SpotifyService {
  static baseUrl: string = 'https://api.spotify.com/v1';

  constructor(public http: Http) {
    localStorage.setItem('limit', '10');
  }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${SpotifyService.baseUrl}${URL}`;

    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }
    return this.http.get(queryUrl)
      .map(res => res.json());
  }

  search(query: string, type: string, limit: string): Observable<any[]> {
    return this.query('/search', [
      `q=${query}`,
      `type=${type}`,
      `limit=${limit}`
    ]);
  }

  searchTracks(query: string, limit: string): Observable<any[]> {
    return this.search(query, 'track', limit);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }
}
