import { tokenData } from "../components/Trade/tokens-data";

export function getTokenDataBySymbol(symbol: string) {
    const tokenSymbol = symbol.slice(0, -4).toLowerCase();
    const token = tokenData.find(
      (token) => token.symbol === tokenSymbol.toLowerCase()
    );
    return token || null;
  }
