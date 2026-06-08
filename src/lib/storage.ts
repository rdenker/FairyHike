import { ResponseData } from "@/types";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "responses.json");
const DATA_DIR = path.join(process.cwd(), "data");

type RedisClient = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: string) => Promise<unknown>;
};

let redisClient: RedisClient | null = null;
let redisAvailable = false;

const redisUrl = process.env.KV_URL || process.env.REDIS_URL;
if (redisUrl) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Redis } = require("@upstash/redis") as {
      Redis: new (opts: { url: string }) => RedisClient;
    };
    redisClient = new Redis({ url: redisUrl });
    redisAvailable = true;
    console.log("Using Upstash Redis for storage");
  } catch {
    console.warn("Redis package not available, falling back to file storage");
  }
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readFileResponses(): ResponseData[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeFileResponses(responses: ResponseData[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2));
}

async function readRedisResponses(): Promise<ResponseData[]> {
  try {
    const data = await redisClient!.get("responses") as ResponseData[] | null;
    return data || [];
  } catch {
    return [];
  }
}

async function writeRedisResponses(responses: ResponseData[]) {
  await redisClient!.set("responses", JSON.stringify(responses));
}

function syncGetAll(): ResponseData[] {
  return readFileResponses();
}

async function asyncGetAll(): Promise<ResponseData[]> {
  if (redisAvailable && redisClient) {
    return readRedisResponses();
  }
  return readFileResponses();
}

function syncAdd(response: ResponseData): void {
  const responses = readFileResponses();
  responses.push(response);
  writeFileResponses(responses);
}

async function asyncAdd(response: ResponseData): Promise<void> {
  if (redisAvailable && redisClient) {
    const responses = await readRedisResponses();
    responses.push(response);
    await writeRedisResponses(responses);
    return;
  }
  const responses = readFileResponses();
  responses.push(response);
  writeFileResponses(responses);
}

export const storage = {
  getAll: (): ResponseData[] => {
    return syncGetAll();
  },

  getAllAsync: async (): Promise<ResponseData[]> => {
    return asyncGetAll();
  },

  add: (response: ResponseData): void => {
    syncAdd(response);
  },

  addAsync: async (response: ResponseData): Promise<void> => {
    await asyncAdd(response);
  },

  getById: (id: string): ResponseData | undefined => {
    return syncGetAll().find((r) => r.id === id);
  },
};
