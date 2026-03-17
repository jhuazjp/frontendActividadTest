import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BackendApiService } from './backend-api.service';

describe('BackendApiService', () => {
  let service: BackendApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendApiService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(BackendApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login against the lite auth endpoint', () => {
    service.login({ emailOrPhone: 'admin@bootcamp.local', password: 'Admin12345' }).subscribe((response) => {
      expect(response.user.roles).toEqual(['ADMIN']);
      expect(response.token).toBe('lite-token');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');

    req.flush({
      success: true,
      data: {
        user: {
          id: '1',
          firstName: 'Bootcamp',
          lastName: 'Admin',
          email: 'admin@bootcamp.local',
          roles: ['ADMIN']
        },
        token: 'lite-token'
      },
      error: null
    });
  });

  it('should list leads from the lite endpoint', () => {
    service.listLeads().subscribe((response) => {
      expect(response.length).toBe(1);
      expect(response[0].status).toBe('NEW');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/leads');
    expect(req.request.method).toBe('GET');

    req.flush({
      success: true,
      data: [
        {
          _id: 'lead-1',
          firstName: 'Ana',
          lastName: 'Lopez',
          email: 'ana@example.com',
          status: 'NEW'
        }
      ],
      error: null
    });
  });
});
