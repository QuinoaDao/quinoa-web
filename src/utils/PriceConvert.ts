import axios from "axios";

export const ConvertPrice = async (symbol: string, amount: number) => {
  if (amount === 0) return amount;
  const baseUrl = "/api/v2/tools/price-conversion";
  let price = 0;
  await axios
    .get(baseUrl, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.REACT_APP_COINMARKETCAP_API_KEY || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        amount: amount,
        symbol: symbol,
      },
    })
    .then((response) => {
      console.log("convert price res :", response);
      price = response.data.data[0].quote.USD.price;
    })
    .catch((error) => {
      console.error(error);
    });
  return price;
};
