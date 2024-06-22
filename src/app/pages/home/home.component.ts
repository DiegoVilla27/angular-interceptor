import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SanitizerHtmlPipe } from "../../pipes/sanitizer-html.pipe";
import { IMovie, MoviesService } from "../../services/movies/movies.service";

@Component({
  selector: "inter-home",
  standalone: true,
  imports: [NgFor],
  providers: [MoviesService, SanitizerHtmlPipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit {
  movies: IMovie[] = [];

  constructor(private _moviesSvc: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this._moviesSvc
      .getMovies({
        page: "1",
        language: "en-US"
      })
      .subscribe((movies: IMovie[]) => (this.movies = movies));
  }
}
