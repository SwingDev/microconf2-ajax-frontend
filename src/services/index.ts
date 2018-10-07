import { AuthService } from './auth.service';
import { CrimeService } from './crime.service';
import { AxiosHttpClient } from './http/axios';
import { IHttpClient } from './http/interfaces';
import { RegionService } from './region.service';
import { SuspectService } from './suspect.service';

export * from './configuration.service';

export const authService: AuthService = new AuthService();

export const apiClient: IHttpClient = new AxiosHttpClient(authService, process.env.API_URL!);

export const crimeService: CrimeService = new CrimeService(apiClient);
export const regionService: RegionService = new RegionService(apiClient);
export const suspectService: SuspectService = new SuspectService(apiClient);