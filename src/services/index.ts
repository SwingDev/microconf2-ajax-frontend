import { AuthService } from './auth.service';
import { configurationService } from './configuration.service';
import { GifService } from './gif.service';
import { AxiosHttpClient } from './http/axios';
import { IHttpClient } from './http/interfaces';
import { TagService } from './tag.service';
import { SourceService } from './source.service';

export * from './configuration.service';

export const authService: AuthService = new AuthService();

const apiUrl: string = configurationService.shouldUseHttp2 ? process.env.HTTP2_API_URL! : process.env.API_URL!;

export const apiClient: IHttpClient = new AxiosHttpClient(authService, apiUrl);

export const gifService: GifService = new GifService(apiClient);
export const tagService: TagService = new TagService(apiClient);
export const sourceService: SourceService = new SourceService(apiClient);
