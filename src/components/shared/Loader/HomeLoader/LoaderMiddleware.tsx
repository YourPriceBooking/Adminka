import { useEffect, useState } from "react";
import { HomeNavItem, Wrapper } from "./LoaderMiddleware.styled";
import HomeLoader from "./HomeLoader";


type IProps = {
  children: React.ReactNode;
  path: string;
};

export const LoaderMiddleware: React.FC<IProps> = ({ children, path }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        window.location.assign(path);
      }, 1000);
    }
  }, [isLoading, path]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <HomeNavItem onClick={handleClick}>
      <Wrapper>{isLoading ? <HomeLoader /> : children}</Wrapper>
    </HomeNavItem>
  );
};
