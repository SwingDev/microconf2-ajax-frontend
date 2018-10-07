import * as uuidv4 from 'uuid/v4';

export class AuthService {
  get authId(): string {
    let authId: string | null = localStorage.getItem('auth');

    if (authId === null) {
      authId = this.resetAuth();
    }

    return authId;
  }

  resetAuth(): string {
    const authId = uuidv4();

    localStorage.setItem('auth', authId);

    return authId;
  }
}
