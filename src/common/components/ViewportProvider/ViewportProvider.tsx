import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IViewport {
  width: number;
  height: number;
}

const ViewportContext = createContext<IViewport>({
  width: 0,
  height: 0,
});

export const ViewportProvider: FC = ({ children }) => {
  const [windowSize, setWindowSize] = useState<IViewport>({
    width: 0,
    height: 0,
  });

  const handleResize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <ViewportContext.Provider value={windowSize}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewportContext = (): IViewport => {
  return useContext<IViewport>(ViewportContext);
};
