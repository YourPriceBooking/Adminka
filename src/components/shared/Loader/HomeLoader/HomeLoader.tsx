import logo from 'assets/icons/logoLoader.svg';
import drop from 'assets/icons/logoLoaderDrop.svg';
import { Svg, WrapperLoader } from './HomeLoader.styled';


const HomeLoader: React.FC = () => (
  <WrapperLoader>
    <img src={logo} alt="logo" width="118px" height="99px" />
    <Svg src={drop} alt="drop" width="27px" height="28px" />
  </WrapperLoader>
);

export default HomeLoader;
