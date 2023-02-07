import { BigNumberish, BigNumber } from "ethers";

export interface ProductInfo {
  tvl: BigNumberish;
  currentPrice: BigNumberish;
  underlyingTokens: UnderlyingTokenInfo[];
}

export interface UnderlyingTokenInfo {
  address: string;
  targetWeight: BigNumberish;
  currentPrice: BigNumberish;
}
