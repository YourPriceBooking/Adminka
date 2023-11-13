import { Img, Item, List } from './Image.styled';

type ImageType = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export const Image = ({ src, alt = 'photo', width = 115, height = 115 }: ImageType) => (
  <List>
    <Item>
      <Img src={src} alt={alt} width={width} height={height} />
    </Item>
  </List>
);
