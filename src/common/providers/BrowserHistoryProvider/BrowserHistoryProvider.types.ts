export type BrowserHistoryContextType = {
  browserHistory: string[];
  pathname: string;
  privatePaths: string[];
  pageLoading: boolean;
  handleLoginRedirect: () => void;
};
