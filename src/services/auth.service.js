import * as uuidv4 from 'uuid/v4';

export class AuthService {
  get authId() {
    let authId = localStorage.getItem('auth');

    if (authId === null) {
      authId = this.resetAuth();
    }

    return authId;
  }

  resetAuth() {
    const authId = uuidv4();

    localStorage.setItem('auth', authId);

    return authId;
  }
}
