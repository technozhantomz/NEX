import { usePeerplaysApi } from "../../modules/peerplaysApi";

const { dbApi } = usePeerplaysApi();

export class Asset {
  id = "";
  symbol = "";
  precision = 0;
  amount = 0;
  constructor(input: Partial<Asset>) {
    Object.assign(this, input);
  }

  async getAssetById(): Promise<void> {
    return await dbApi("get_assets", [[this.id]])
      .then(({ precision, symbol }: Asset): Asset => {
        this.precision = precision;
        this.symbol = symbol;
        return this;
      })
      .catch(console.error);
  }
  async getAssetBySymbol(): Promise<void> {
    return await dbApi("lookup_asset_symbols", [[this.symbol]])
      .then(({ id, precision }: Asset): Asset => {
        this.id = id;
        this.precision = precision;
        return this;
      })
      .catch(console.error);
  }

  setPrecision(
    roundTo = false,
    amount = this.amount,
    precision = this.precision
  ): void | number {
    const precisioned = amount / 10 ** precision;
    return roundTo ? roundNum(precisioned, precision) : precisioned;
  }

  toString(amount = this.amount): string {
    return `${this.setPrecision(true, amount)} ${this.symbol}`;
  }
}

const roundNum = (num: number, roundTo = 5) => {
  num = Number(num);
  return Number(num.toFixed(roundTo));
};
