import { BigNumberish, BigNumber } from "ethers";

export interface ProductInfo {
  tvl: BigNumberish;
  currentPrice: BigNumberish;
  underlyingTokens: UnderlyingTokenInfo[];
}

export interface UnderlyingTokenInfo {
  symbol: string;
  name: string;
  address: string;
  targetWeight: BigNumberish;
  quantity: BigNumberish;
  dollarPrice: number;
  decimal: string;
  logo: string;
}
