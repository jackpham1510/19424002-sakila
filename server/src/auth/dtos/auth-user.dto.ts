export class AuthUser {
  id: number;

  static of(id: number) {
    const authUser = new AuthUser();
    authUser.id = id;
    return authUser;
  }
}