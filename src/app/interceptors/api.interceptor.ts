import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { UiService } from "../services/ui/ui.service";

type TErrorMsg = { msg: string; code: string };

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Injects
  const _swal: UiService = inject(UiService);

  // Create clone to request http
  // Add new Bearer Token
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${environment.api_key}`
    }
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const { msg, code }: TErrorMsg = getError(error.status);
      _swal.toastShow(msg, "error", "bottom", code, 8000);
      return throwError(() => error);
    })
  );
};

const getError = (status: number): TErrorMsg => {
  let errorMessage: TErrorMsg = {
    msg: "Unknown error occurred!",
    code: "Unknown status code"
  };
  switch (status) {
    case 400:
      errorMessage = { msg: "Bad request", code: "Status code: 400" };
      break;
    case 401:
      errorMessage = { msg: "Invalid credentials", code: "Status code: 401" };
      break;
    case 403:
      errorMessage = { msg: "You must be logged in", code: "Status code: 403" };
      break;
    case 404:
      errorMessage = { msg: "Page not found", code: "Status code: 404" };
      break;
    case 405:
      errorMessage = { msg: "Method not allowed", code: "Status code: 405" };
      break;
    case 500:
      errorMessage = { msg: "Internal server error", code: "Status code: 500" };
      break;
    case 501:
      errorMessage = { msg: "Not implemented", code: "Status code: 501" };
      break;
    case 502:
      errorMessage = { msg: "Bad gateway", code: "Status code: 502" };
      break;
    case 504:
      errorMessage = { msg: "Gateway timeout", code: "Status code: 504" };
      break;
  }
  return errorMessage;
};
