import styled from 'styled-components';

export const Z_INDEX = 999;   // Remind: same as header

export const Fixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin-top: 10px;
  z-index: ${Z_INDEX};
  width: 100vw;
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  font-size: 24px;
  margin-left: 10px;
  cursor: pointer;
`;
