import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { SanitizerHtmlPipe } from "../../pipes/sanitizer-html.pipe";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "inter-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [SanitizerHtmlPipe],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthService,
    private _sanitizerHtmlPipe: SanitizerHtmlPipe
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this._fb.group({
      email: [""],
      password: [""]
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formSanitized: Record<string, string> =
        this._sanitizerHtmlPipe.sanitizeFormValues(this.form.value);
      this._authSvc.login(formSanitized).subscribe();
    }
  }
}
