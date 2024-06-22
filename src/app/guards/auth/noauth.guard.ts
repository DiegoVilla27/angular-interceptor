import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const noAuthGuard: CanActivateFn = () => {
  const _router: Router = inject(Router);
  const _token: string = localStorage.getItem("token")!;

  if (!_token) return true;
  _router.navigate(["/"]);
  return false;
};
