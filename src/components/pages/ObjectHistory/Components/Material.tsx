import doc from 'assets/icons/doc.svg';
import camera from 'assets/icons/camera.svg';
import selfi from 'assets/icons/selfi.svg';
import fold from 'assets/icons/folder.svg';
import { useState } from 'react';
import { useAppSelector } from 'App';
import { getObjectOnVerify } from 'features/objectOnVerify/objectOnVerifySelector';

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
  ButtonRow,
  StyledButton,
} from './Compinents.styled';



export const Material = () => {
  // const sampleText = `Test document`;
  const {
    data: {
      documents,
      selfie,
      video,
      hotels: { _id: id },
    },
  } = useAppSelector(getObjectOnVerify);

  const regex = new RegExp(`^${id}/\\d*-`, 'i');

  const materialData = documents.map(elem => ({
    imgUrl: fold,
    sizeText: '??? Kb',
    nameText: elem.replace(regex, ''),
    dataUrl: `https://ypbooking.chost.com.ua/verification/${elem}`,
  }));

  const materialDataVideo = video.map((elem: string) => ({
    videoUrl: `https://ypbooking.chost.com.ua/verification/${elem}`,
    sizeText: '??? Kb',
    nameText: elem.replace(regex, ''),
  }));

  const selfieData = selfie.map((elem: string) => ({
    imgUrl: fold,
    sizeText: '??? Kb',
    nameText: elem.replace(regex, ''),
    dataUrl: `https://ypbooking.chost.com.ua/verification/${elem}`,
  }));


  // const materialData = [
  //   { imgUrl: fold, sizeText: '64 Kb', nameText: 'fjhnfd8hb.txt' },
  //   { imgUrl: fold, sizeText: '64 Kb', nameText: 'fjhnfd8hb.txt' },
  //   { imgUrl: fold, sizeText: '64 Kb', nameText: 'fjhnfd8hb.txt' },
  //   { imgUrl: fold, sizeText: '64 Kb', nameText: 'fjhnfd8hb.txt' },
  // ];

  // const materialDataVideo = [
  //   {
  //     videoUrl: 'https://www.youtube.com/watch?v=efFmBpPp70k',
  //     sizeText: '64 Kb',
  //     nameText: 'video1.mp4',
  //   },
  //   {
  //     videoUrl: 'https://www.youtube.com/watch?v=efFmBpPp70k',
  //     sizeText: '64 Kb',
  //     nameText: 'video2.mp4',
  //   },
  // ];

  // const dataUrl = URL.createObjectURL(new Blob([sampleText], { type: 'text/plain' }));
  // const imageUrl = URL.createObjectURL(new Blob(['imageData'], { type: 'image/jpeg' }));

  return (
    <DivMaterialMain>
      <DivMaterial>
        <DivFrameCamera>
          <img src={camera} alt="camera" />
        </DivFrameCamera>
        <SpanMaterial>video about the object</SpanMaterial>
        <DivFoldMaterial style={{ marginTop: '22px' }}>
          {materialDataVideo.map((data, index) => (
            <div>
              <ImgFoldMaterial
                src={fold}
                alt="fold"
              />
              <PFoldText>
                {data.sizeText}
                <br /> {data.nameText}
              </PFoldText>
                <ButtonRow>
                  <StyledButton
                    type="button"
                    onClick={() => window.open(materialDataVideo[index].videoUrl, '_blank')}
                  >
                    View
                  </StyledButton>
                  <StyledButton
                    type="button"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = materialDataVideo[index].videoUrl;
                      link.download = materialDataVideo[index].nameText;
                      link.click();
                    }}
                  >
                    Download
                  </StyledButton>
                </ButtonRow>
            </div>
          ))}
        </DivFoldMaterial>
      </DivMaterial>
      <DivMaterial>
        <div>
          <img src={doc} alt="camera" style={{ marginTop: '20px' }} />
        </div>
        <SpanMaterial>the documents</SpanMaterial>
        <DivFoldCenter>
          {materialData.map(data => (
            <div>
              <a href={data.dataUrl} download={data.nameText}>
                <ImgFoldMaterial src={data.imgUrl} alt="fold" />
                <PFoldText>
                  {data.sizeText}
                  <br />
                  {data.nameText}
                </PFoldText>
              </a>
            <div>
                <InputMaterial type="text" value={data.dataUrl} />
            </div>
            </div>
          ))}
        </DivFoldCenter>
      </DivMaterial>
      <DivMaterial>
        <div>
          <img src={selfi} alt="camera" />
        </div>
        <SpanMaterial>selfie photo with document</SpanMaterial>
        <DivFoldMaterial>
          {selfieData.map(elem => (
            <a href={elem.dataUrl} download={`${elem.nameText}`}>
              <ImgFoldMaterial src={fold} alt="fold" />
              <PFoldText>
                {elem.sizeText}
                <br />
                {elem.nameText}
              </PFoldText>
            </a>
          ))}
          {/* <a href={imageUrl} download="image.jpeg">
            <ImgFoldMaterial src={fold} alt="fold" />
            <PFoldText>
              64 Kb
              <br /> fjhnfd8hb.txt
            </PFoldText>
          </a> */}
        </DivFoldMaterial>
      </DivMaterial>
    </DivMaterialMain>
  );
};
