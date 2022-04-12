export type BrowserHistoryContextType = {
  browserHistory: string[];
  pathname: string;
  privatePaths: string[];
  handleLoginRedirect: () => void;
};
