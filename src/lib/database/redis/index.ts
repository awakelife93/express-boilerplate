import config from "@/config";
import * as redis from "redis";
import { promisify } from "util";
import { redisConfig } from "../config";

class Redis {
  private client!: redis.RedisClient;

  connectRedis(): void {
    this.client = redis.createClient(redisConfig[config.NODE_ENV]);
  }

  get(key: string): Promise<string | null> {
    const _get = promisify(this.client.get).bind(this.client);
    return _get(key);
  }

  set(key: string, value: string): void {
    this.client.set(key, value);
  }

  remove(key: string): void {
    this.client.del(key);
  }
}

export default new Redis();
