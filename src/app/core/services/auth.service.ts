import { Injectable, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { BackendApiService } from './backend-api.service';
import { AuthUser, UserRole } from '../models/api.models';

const TOKEN_KEY = 'lite_access_token';
const USER_KEY = 'lite_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = this.readStorage(TOKEN_KEY);
  readonly user = signal<AuthUser | null>(this.readUser());

  constructor(private readonly api: BackendApiService) {}

  login(emailOrPhone: string, password: string): Observable<AuthUser> {
    return this.api.login({ emailOrPhone, password }).pipe(
      tap((data) => {
        this.accessToken = data.token;
        this.user.set(data.user);
        this.writeStorage(TOKEN_KEY, data.token);
        this.writeStorage(USER_KEY, JSON.stringify(data.user));
      }),
      map((data) => data.user)
    );
  }

  ensureAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.accessToken && !!this.user());
  }

  logout(): Observable<boolean> {
    this.clearSession();
    return of(true);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  hasRole(role: UserRole): boolean {
    return !!this.user()?.roles.includes(role);
  }

  clearSession(): void {
    this.accessToken = null;
    this.user.set(null);
    this.removeStorage(TOKEN_KEY);
    this.removeStorage(USER_KEY);
  }

  private readUser(): AuthUser | null {
    const raw = this.readStorage(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private readStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private writeStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }

  private removeStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}
