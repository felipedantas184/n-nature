import Image from "next/image";
import styled from "styled-components";

const Banner = () => {
  return ( 
    <ImageWrapper>
      <Image src={(window.innerWidth > 768 ? '/assets/images/banners/banner_01.webp' : '/assets/images/banners/banner_01.webp')} alt={`${window.innerWidth}`}  fill sizes="(max-width: 384px)" className={'image'}/>
    </ImageWrapper>
   );
}
 
export default Banner;


const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 400px;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  > div {
    position: unset !important;
    transition: transform 0.5s ease-in-out;
  }
  
  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    transition: transform 0.5s ease-in-out;
  }
`