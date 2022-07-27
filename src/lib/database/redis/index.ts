import config from "@/config";
import { ErrorStatusMessage } from "@/lib";
import _ from "lodash";
import redis from "redis";
import { promisify } from "util";
import { redisConfig } from "../config";

/**
 * EX: s
 * PX: ms
 */
type ExpireMode = "EX" | "PX";

class Redis {
  private client: redis.RedisClient | null = null;

  connect(): void {
    this.client = redis.createClient(redisConfig);
  }

  get(key: string): Promise<string | null> {
    if (_.isNull(this.client)) {
      throw new Error(ErrorStatusMessage.IS_NULL_REDIS);
    }

    return promisify(this.client.get).bind(this.client)(key);
  }

  set(
    key: string,
    value: string,
    mode: ExpireMode = "PX",
    time: number = config.jwtRefreshExpireMS
  ): void {
    if (_.isNull(this.client)) {
      throw new Error(ErrorStatusMessage.IS_NULL_REDIS);
    }

    this.client.set(key, value, mode, time);
  }

  remove(key: string): void {
    if (_.isNull(this.client)) {
      throw new Error(ErrorStatusMessage.IS_NULL_REDIS);
    }

    this.client.del(key);
  }
}

export default new Redis();
