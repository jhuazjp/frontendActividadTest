import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loading = false;
  errorMessage = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly seo: SeoService
  ) {
    this.seo.update({
      title: 'Login | APZ Tattoo',
      description: 'Acceso seguro a paneles por rol en APZ Tattoo.'
    });
  }

  onSubmit(payload: { emailOrPhone: string; password: string }): void {
    this.loading = true;
    this.errorMessage = '';

    this.auth.login(payload.emailOrPhone, payload.password).subscribe({
      next: (user) => {
        this.loading = false;

        if (user.roles.includes('ADMIN')) {
          this.router.navigateByUrl('/admin');
          return;
        }

        this.router.navigateByUrl('/');
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Credenciales invalidas o sin permisos.';
      }
    });
  }
}
