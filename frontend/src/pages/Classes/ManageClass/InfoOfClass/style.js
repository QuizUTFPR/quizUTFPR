import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  display: flex;
  gap: 20px;
`;

export const RightWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LeftWrapper = styled.div`
  width: 60%;
`;

export const InfoClassWrapper = styled.div`
  box-shadow: 1px 1px 8px -3px rgb(54 48 48 / 49%);
  background: white;
  border-radius: 8px;
  padding: 20px;
`;

export const ImageClass = styled.img`
  width: 100%;
`;

export const WrapperText = styled.div``;

export const Bold = styled.span`
  font-weight: 700;
  margin-right: 10px;
`;

export const ValueText = styled.span``;

export const WrapperInformation = styled.div`
  background: white;
  box-shadow: 1px 1px 8px -3px rgb(54 48 48 / 49%);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
`;

export const CircleIconInformation = styled.div`
  background: ${(props) => props.color};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  flex-shrink: 0;
`;

export const ContentWrapperInformation = styled.div``;

export const TitleInformation = styled.p`
  font-size: 1rem;
  font-weight: bolder;
`;

export const ValueInformation = styled.p`
  font-size: 0.9rem;
`;
