import config from "@/config";
import redis from "redis";
import { promisify } from "util";
import { redisConfig } from "../config";

/**
 * EX: s
 * PX: ms
 */
type ExpireModeType = "EX" | "PX";

class Redis {
  private readonly client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient(redisConfig);
  }

  get(key: string): Promise<string | null> {
    return promisify(this.client.get).bind(this.client)(key);
  }

  set(
    key: string,
    value: string,
    mode: ExpireModeType = "PX",
    time: number = config.jwtRefreshExpireMS
  ): void {
    this.client.set(key, value, mode, time);
  }

  remove(key: string): void {
    this.client.del(key);
  }
}

export default new Redis();
