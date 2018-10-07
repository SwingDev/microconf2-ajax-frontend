import { AxiosHttpClient } from './http/axios';
import { AuthService } from './auth.service';
import { GifService } from './gif.service';

export const authService = new AuthService();

const apiUrl = process.env.API_URL;
export const apiClient = new AxiosHttpClient(authService, apiUrl);

export const gifService = new GifService(apiClient);
