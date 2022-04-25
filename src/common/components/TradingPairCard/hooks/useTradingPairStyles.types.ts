export type UseTradingPairStylesResult = {
  positiveTheme: Theme;
  negativeTheme: Theme;
  showChangeAndVolume: boolean;
  changeBackgroundColor: boolean;
  handleMouseHover: () => void;
  handleMouseOut: () => void;
};

export type Theme = {
  backgroundColorCode: string;
  display: string;
  percentChangeColor: string;
};
