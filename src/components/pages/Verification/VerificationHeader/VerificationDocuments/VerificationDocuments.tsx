import iconFolder from 'assets/icons/folder.png';
import iconPlus from 'assets/icons/plus.svg';
import { Wrapper, Button, Img, Text, List, ListWrapper, Svg } from './VerificationDocuments.styled';

export const VerificationDocuments = () => (
  <Wrapper>
    <Button type="button">
      add selfie photo with document, verifier documents
      <Svg src={iconPlus} alt="plus" />
    </Button>

    <ListWrapper>
      <List>
        <li>
          <Img src={iconFolder} alt="" />
          <Text>fjhnfd8hb.txt</Text>
        </li>
        <li>
          <Img src={iconFolder} alt="" />
          <Text>fjhnfd8hb.txt</Text>
        </li>
        <li>
          <Img src={iconFolder} alt="" />
          <Text>fjhnfd8hb.txt</Text>
        </li>
        <li>
          <Img src={iconFolder} alt="" />
          <Text>fjhnfd8hb.txt</Text>
        </li>
        <li>
          <Img src={iconFolder} alt="" />
          <Text>fjhnfd8hb.txt</Text>
        </li>
        <li>
          <Img src={iconFolder} alt="" />
          <Text>fjhnfd8hb.txt</Text>
        </li>
      </List>
    </ListWrapper>
  </Wrapper>
);
