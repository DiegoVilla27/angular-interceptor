import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { SanitizerHtmlPipe } from "../../pipes/sanitizer-html.pipe";
import { setParams } from "../../helpers/set-params.helper";

interface IMovieResponse {
  page: string;
  results: IMovie[];
  total_pages: string;
  total_results: string;
}

export interface IMovie {
  backdrop_path: string;
  id: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
}

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(
    private _http: HttpClient,
    private _sanitizerHtmlPipe: SanitizerHtmlPipe
  ) {}

  getMovies(filters: Record<string, string>): Observable<IMovie[]> {
    return this._http
      .get<IMovieResponse>(`${environment.api_url}/movie/popular`, {
        params: setParams(filters, this._sanitizerHtmlPipe)
      })
      .pipe(map((res: IMovieResponse) => this.mapResults(res)));
  }

  mapResults(res: IMovieResponse): IMovie[] {
    return res.results.map((movie: IMovie) => {
      return {
        ...movie,
        backdrop_path: `${environment.api_url_image}${movie.backdrop_path}`,
        poster_path: `${environment.api_url_image}${movie.poster_path}`
      };
    });
  }
}
