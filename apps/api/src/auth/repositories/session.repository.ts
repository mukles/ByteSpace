import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { User } from "../entities/user.entity";
import { newTokenValue } from "./refresh-token.repository";

@Injectable()
export class SessionRepository {
  constructor(private readonly dataSource: DataSource) {}

  startExclusiveSession(
    userId: string,
    familyId: string,
    refreshTtlSeconds: number,
  ): Promise<RefreshToken> {
    return this.dataSource.transaction(async (manager) => {
      await manager.delete(RefreshToken, { userId });
      await manager.update(User, { id: userId }, { sessionId: familyId });
      return manager.save(
        manager.create(RefreshToken, {
          token: newTokenValue(),
          familyId,
          userId,
          expiresAt: new Date(Date.now() + refreshTtlSeconds * 1000),
        }),
      );
    });
  }

  async revokeSession(userId: string, familyId: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(RefreshToken, { familyId });
      await manager.update(
        User,
        { id: userId, sessionId: familyId },
        { sessionId: null },
      );
    });
  }
}
