import axios from "axios";

export type PriceInfoType = {
  price: number;
  percent_change: number;
};

export const PriceInfo = async (symbol: string) => {
  const baseUrl = "/api/v2/cryptocurrency/quotes/latest";
  let priceInfo: PriceInfoType = {
    price: 0,
    percent_change: 0,
  };
  await axios
    .get(baseUrl, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKETCAP_API_KEY || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        symbol: symbol,
      },
    })
    .then((response) => {
      priceInfo.price = response.data.data[symbol][0].quote.USD.price;
      priceInfo.percent_change =
        response.data.data[symbol][0].quote.USD.percent_change_7d;
    })
    .catch((error) => {
      console.error(error);
      return priceInfo;
    });
  return priceInfo;
};
