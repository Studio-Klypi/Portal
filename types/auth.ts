export interface ISession {
  token: string;
  userUuid: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
}
