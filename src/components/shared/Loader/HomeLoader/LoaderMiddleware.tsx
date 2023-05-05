import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeNavItem, Wrapper } from "./LoaderMiddleware.styled";
import HomeLoader from "./HomeLoader";


type IProps = {
  children: React.ReactNode;
  path: string;
};

export const LoaderMiddleware: React.FC<IProps> = ({ children, path }) => {
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
  };


  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (isLoading) {
      timerId = setTimeout(() => {
        navigate(path);
        setIsLoading(false);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [isLoading, navigate, path]);


  return (
    <HomeNavItem onClick={handleClick}>
      <Wrapper >
        {isLoading ? <HomeLoader /> : children}
      </Wrapper>
    </HomeNavItem>
  );
};
