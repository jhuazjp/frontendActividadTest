import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { SeoService } from '../../../core/services/seo.service';
import { Appointment, AuthUser, Lead } from '../../../core/models/api.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  users: AuthUser[] = [];
  leads: Lead[] = [];
  appointments: Appointment[] = [];
  message = '';

  readonly userForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['CLIENT', Validators.required]
  });

  readonly appointmentForm = this.fb.nonNullable.group({
    leadId: [''],
    clientName: [''],
    artistName: ['APZ'],
    scheduledFor: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private readonly api: BackendApiService,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Admin Panel | APZ Tattoo Lite',
      description: 'Panel corto para crear usuarios, revisar leads y programar citas.'
    });

    this.reload();
  }

  reload(): void {
    forkJoin({
      users: this.api.listUsers(),
      leads: this.api.listLeads(),
      appointments: this.api.listAppointments()
    }).subscribe({
      next: ({ users, leads, appointments }) => {
        this.users = users;
        this.leads = leads;
        this.appointments = appointments;
      },
      error: () => {
        this.message = 'No fue posible cargar el panel.';
      }
    });
  }

  createUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const value = this.userForm.getRawValue();

    this.api
      .createUser({
        ...value,
        roles: [value.role]
      })
      .subscribe({
        next: () => {
          this.message = 'Usuario creado.';
          this.userForm.reset({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            role: 'CLIENT'
          });
          this.reload();
        },
        error: () => {
          this.message = 'No fue posible crear el usuario.';
        }
      });
  }

  markLeadAs(status: Lead['status'], lead: Lead): void {
    this.api.updateLead(lead._id, { status }).subscribe({
      next: () => {
        this.message = `Lead actualizado a ${status}.`;
        this.reload();
      },
      error: () => {
        this.message = 'No fue posible actualizar el lead.';
      }
    });
  }

  createAppointment(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    this.api.createAppointment(this.appointmentForm.getRawValue()).subscribe({
      next: () => {
        this.message = 'Cita creada.';
        this.appointmentForm.reset({
          leadId: '',
          clientName: '',
          artistName: 'APZ',
          scheduledFor: '',
          notes: ''
        });
        this.reload();
      },
      error: () => {
        this.message = 'No fue posible crear la cita.';
      }
    });
  }
}
