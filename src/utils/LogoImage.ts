import axios from "axios";

export const GetLogoImage = async (symbol: string) => {
  if (symbol === "") return "";
  const baseUrl = "/api/v2/cryptocurrency/info";
  let img = "";
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
      img = response.data.data[symbol][0].logo;
    })
    .catch((error) => {
      console.error(error);
    });
  return img;
};
