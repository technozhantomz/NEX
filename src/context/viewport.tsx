import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

interface IViewport {
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
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // only execute all the code below in client side
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

export const useViewport = (): IViewport => {
  return useContext<IViewport>(ViewportContext);
};
