import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Appointment, AuthUser, Lead, LoginResponse } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class BackendApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  login(payload: { emailOrPhone: string; password: string }): Observable<LoginResponse> {
    return this.unwrap(this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/auth/login`, payload));
  }

  submitPublicContact(payload: Record<string, unknown>): Observable<Lead> {
    return this.unwrap(this.http.post<ApiResponse<Lead>>(`${this.baseUrl}/public/leads`, payload));
  }

  listUsers(): Observable<AuthUser[]> {
    return this.unwrap(this.http.get<ApiResponse<AuthUser[]>>(`${this.baseUrl}/users`));
  }

  createUser(payload: Record<string, unknown>): Observable<AuthUser> {
    return this.unwrap(this.http.post<ApiResponse<AuthUser>>(`${this.baseUrl}/users`, payload));
  }

  listLeads(): Observable<Lead[]> {
    return this.unwrap(this.http.get<ApiResponse<Lead[]>>(`${this.baseUrl}/leads`));
  }

  updateLead(leadId: string, payload: Record<string, unknown>): Observable<Lead> {
    return this.unwrap(this.http.patch<ApiResponse<Lead>>(`${this.baseUrl}/leads/${leadId}`, payload));
  }

  listAppointments(): Observable<Appointment[]> {
    return this.unwrap(this.http.get<ApiResponse<Appointment[]>>(`${this.baseUrl}/appointments`));
  }

  createAppointment(payload: Record<string, unknown>): Observable<Appointment> {
    return this.unwrap(this.http.post<ApiResponse<Appointment>>(`${this.baseUrl}/appointments`, payload));
  }

  private unwrap<T>(source$: Observable<ApiResponse<T>>): Observable<T> {
    return source$.pipe(map((response) => response.data));
  }
}
