import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment.development";

interface IAuthResponse {
  success: string;
  status_code: string;
  status_message: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {}

  login({
    email,
    password
  }: Record<string, string>): Observable<IAuthResponse> {
    return this._http
      .get<IAuthResponse>(`${environment.api_url}/authentication`, {
        params: { email, password }
      })
      .pipe(
        tap((res: IAuthResponse) => {
          if (res.success) {
            localStorage.setItem("token", "true");
            this._router.navigate(["/"]);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }
}
