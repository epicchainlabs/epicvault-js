import { rpc } from "./packages/epicvault-core/src";

export const TESTNET_URLS = [
  "testnet1-seed.epic-chain.org:20111",
  "testnet2-seed.epic-chain.org:20111",
  "testnet3-seed.epic-chain.org:20111",
  "testnet4-seed.epic-chain.org:20111",
  "testnet5-seed.epic-chain.org:20111"
];

//Node17+ defaults to resolving IPv6 by default so localhost does not work anymore.
export const LOCALNET_URLS = ["http://127.0.0.1:20111"];

export async function getIntegrationEnvUrl(): Promise<string> {
  const urls = isTestNet() ? TESTNET_URLS : LOCALNET_URLS;
  return await getBestUrl(urls);
}

export function isTestNet(): boolean {
  return (global["__TARGETNET__"] as string).toLowerCase() === "testnet";
}
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getBestUrl(urls: string[]): Promise<string> {
  const data = await Promise.all(urls.map((url) => safelyCheckHeight(url)));
  const heights = data.map((h, i) => ({ height: h, url: urls[i] }));
  const best = heights.reduce(
    (bestSoFar, h) => (bestSoFar.height >= h.height ? bestSoFar : h),
    { height: -1, url: "" }
  );
  if (!best.url) {
    throw new Error("No good endpoint found");
  }
  return best.url;
}

async function safelyCheckHeight(url: string): Promise<number> {
  try {
    const res = await rpc.sendQuery(url, rpc.Query.getBlockCount(), {
      timeout: 10000,
    });
    return res.result;
  } catch (_e) {
    console.log("Error while checking RPC height:" + _e);
    return -1;
  }
}
