import { rpc } from "@cityofzion/neon-core";

const TESTNET_URLS = [
  "http://testnet1-seed.epic-chain.org:20111",
  "http://testnet2-seed.epic-chain.org:20111",
  "http://testnet3-seed.epic-chain.org:20111",
  "http://testnet4-seed.epic-chain.org:20111",
  "http://testnet5-seed.epic-chain.org:20111",
];

const MAINNET_URLS = [
  "http://mainnet1-seed.epic-chain.org:10111",
  "http://mainnet2-seed.epic-chain.org:10111",
  "http://mainnet3-seed.epic-chain.org:10111",
  "http://mainnet4-seed.epic-chain.org:10111",
  "http://mainnet5-seed.epic-chain.org:10111",
];

export function getUrls(net: string): string[] {
  if (net === "TestNet") {
    return TESTNET_URLS;
  } else if (net === "MainNet") {
    return MAINNET_URLS;
  } else {
    throw new Error("Expected MainNet or TestNet");
  }
}

function cutArray<T>(arr: T[]): T[] {
  const randomStartIndex = Math.floor(Math.random() * arr.length);
  return arr.slice(randomStartIndex).concat(arr.slice(0, randomStartIndex));
}
export async function getUrl(net: string): Promise<string> {
  const orderedUrls = getUrls(net);

  const slicedUrls = cutArray(orderedUrls);
  let previousBlockCount = 0;
  for (let i = 0; i < slicedUrls.length; i++) {
    try {
      const dispatcher = new rpc.RpcDispatcher(slicedUrls[i]);
      const currentBlockCount = await dispatcher.execute<number>(
        rpc.Query.getBlockCount(),
        {
          timeout: 2000,
        }
      );
      if (currentBlockCount - previousBlockCount <= 5) {
        return slicedUrls[i];
      }
      previousBlockCount = Math.max(currentBlockCount, previousBlockCount);
    } catch (e) {
      continue;
    }
  }
  throw new Error("Explored all URLs, but no RPC available—still searching for a connection!");
}
