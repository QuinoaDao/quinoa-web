export const roundNumbers = (targetNum: any) => {
    if(targetNum == 0) return "0"

    if(targetNum < 0) targetNum *= -1;
    targetNum = Math.round(targetNum * 1000) / 1000;

    if(Math.round(targetNum * 1000) / 1000 < 0.005) {
      return "<0.01";
    }
    else return (Math.round(targetNum * 100) / 100).toString();
}