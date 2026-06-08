import { ResponseData } from "@/types";
import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

// ── In-memory fallback (useful for serverless with no KV configured) ──
const memoryStore: ResponseData[] = [];

// ── Redis setup ──
let redisClient: {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: string) => Promise<unknown>;
} | null = null;
let redisAvailable = false;

const redisUrl =
  process.env.KV_REST_API_URL || process.env.REDIS_REST_URL;
const redisToken =
  process.env.KV_REST_API_TOKEN || process.env.REDIS_REST_TOKEN;

if (redisUrl && redisToken) {
  try {
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken,
    });
    redisAvailable = true;
    console.log("Using Upstash Redis for storage");
  } catch {
    console.warn("Redis connection failed, falling back to memory storage");
  }
} else if (redisUrl) {
  console.warn("KV_REST_API_URL is set but KV_REST_API_TOKEN is missing. Redis will not be used.");
}

// ── File storage (development only) ──
const isServerless = process.env.VERCEL !== undefined || process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;

function ensureFileStorageSafe() {
  try {
    const DATA_DIR = path.join(process.cwd(), "data");
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Read-only filesystem (e.g. on Vercel), ignore
  }
}

function readFileResponses(): ResponseData[] {
  try {
    ensureFileStorageSafe();
    const DATA_FILE = path.join(process.cwd(), "data", "responses.json");
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
  try {
    ensureFileStorageSafe();
    const DATA_FILE = path.join(process.cwd(), "data", "responses.json");
    fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2));
  } catch {
    // Read-only filesystem, ignore
  }
}

// ── Redis helpers ──
async function readRedisResponses(): Promise<ResponseData[]> {
  try {
    const data = (await redisClient!.get("responses")) as ResponseData[] | null;
    return data || [];
  } catch {
    return [];
  }
}

async function writeRedisResponses(responses: ResponseData[]) {
  await redisClient!.set("responses", JSON.stringify(responses));
}

// ── Public API ──
export const storage = {
  getAll: (): ResponseData[] => {
    return readFileResponses();
  },

  getAllAsync: async (): Promise<ResponseData[]> => {
    if (redisAvailable && redisClient) {
      return readRedisResponses();
    }
    return readFileResponses();
  },

  add: (response: ResponseData): void => {
    const responses = readFileResponses();
    responses.push(response);
    writeFileResponses(responses);
  },

  addAsync: async (response: ResponseData): Promise<void> => {
    // 1) Redis
    if (redisAvailable && redisClient) {
      const responses = await readRedisResponses();
      responses.push(response);
      await writeRedisResponses(responses);
      return;
    }

    // 2) File (dev only)
    const responses = readFileResponses();
    responses.push(response);
    writeFileResponses(responses);

    // 3) In-memory (serverless fallback, non-persistent)
    if (isServerless) {
      memoryStore.push(response);
      console.warn(
        "Using in-memory storage (non-persistent). " +
          "Set KV_REST_API_URL + KV_REST_API_TOKEN to enable Redis."
      );
    }
  },

  getById: (id: string): ResponseData | undefined => {
    return readFileResponses().find((r) => r.id === id);
  },
};