import { BigNumberish, BigNumber } from "ethers";

export interface ProductInfo {
  tvl: number;
  currentPrice: number;
  underlyingTokens: UnderlyingTokenInfo[];
}

export interface UnderlyingTokenInfo {
  symbol: string;
  name: string;
  address: string;
  targetWeight: number;
  quantity: number;
  dollarPrice: number;
  decimal: string;
  logo: string;
}
