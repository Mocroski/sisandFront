const TOKEN_KEY = '@auth-token';
const REFRESHTOKEN_KEY = '@auth-refreshtoken';

export class TokenMethodsUtils {
  static signOut(): void {
    sessionStorage.clear();
  }

  static saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
    console.log(sessionStorage.getItem)
  }

  static saveRefreshToken(refreshToken: string): void {
    sessionStorage.removeItem(REFRESHTOKEN_KEY);
    sessionStorage.setItem(REFRESHTOKEN_KEY, refreshToken);
  }

  static getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  static getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}