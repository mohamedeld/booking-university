import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above

export const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  
  prefix: "@upstash/ratelimit",
});


