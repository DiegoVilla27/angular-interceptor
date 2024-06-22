import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth/auth.guard";
import { noAuthGuard } from "./guards/auth/noauth.guard";

export const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent)
  },
  {
    path: "login",
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import("./pages/login/login.component").then((m) => m.LoginComponent)
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];
