import doc from 'assets/icons/doc.svg';
import camera from 'assets/icons/camera.svg';
import selfi from 'assets/icons/selfi.svg';
import fold from 'assets/icons/folder.svg';
import {
  DivFoldCenter,
  DivFoldMaterial,
  DivFrameCamera,
  DivMaterial,
  DivMaterialMain,
  ImgFoldMaterial,
  InputMaterial,
  PFoldText,
  SpanMaterial,
} from './Compinents.styled';

export const Matetial = () => (
  <DivMaterialMain>
    <DivMaterial>
      <DivFrameCamera>
        <img src={camera} alt="camera" />
      </DivFrameCamera>
      <SpanMaterial>video about the object</SpanMaterial>
      <DivFoldMaterial style={{ marginTop: '22px' }}>
        <ImgFoldMaterial src={fold} alt="fold" />
        <PFoldText>
          64 Kb
          <br /> fjhnfd8hb.txt
        </PFoldText>
        <ImgFoldMaterial src={fold} alt="fold" />
        <PFoldText>
          64 Kb
          <br /> fjhnfd8hb.txt
        </PFoldText>
      </DivFoldMaterial>
    </DivMaterial>
    <DivMaterial>
      <div>
        <img src={doc} alt="camera" style={{ marginTop: '20px' }} />
      </div>
      <SpanMaterial>the documents</SpanMaterial>
      <DivFoldCenter>
        <div>
          <img src={fold} alt="fold" />
          <PFoldText>
            64 Kb
            <br /> fjhnfd8hb.txt
          </PFoldText>
        </div>
        <div>
          <img src={fold} alt="fold" />
          <PFoldText>
            64 Kb
            <br /> fjhnfd8hb.txt
          </PFoldText>
        </div>
        <div>
          <img src={fold} alt="fold" />
          <PFoldText>
            64 Kb
            <br /> fjhnfd8hb.txt
          </PFoldText>
        </div>
        <div>
          <img src={fold} alt="fold" />
          <PFoldText>
            64 Kb
            <br /> fjhnfd8hb.txt
          </PFoldText>
        </div>
      </DivFoldCenter>
      <div>
        <InputMaterial type="text" value="https://www.figma.com/file/v" />
        <InputMaterial type="text" value="https://www.figma.com/file/v" />
      </div>
    </DivMaterial>
    <DivMaterial>
      <div>
        <img src={selfi} alt="camera" />
      </div>
      <SpanMaterial>selfie photo with document</SpanMaterial>
      <DivFoldMaterial>
        <ImgFoldMaterial src={fold} alt="fold" />
        <PFoldText>
          64 Kb
          <br /> fjhnfd8hb.txt
        </PFoldText>
        <ImgFoldMaterial src={fold} alt="fold" />
        <PFoldText>
          64 Kb
          <br /> fjhnfd8hb.txt
        </PFoldText>
      </DivFoldMaterial>
    </DivMaterial>
  </DivMaterialMain>
);
