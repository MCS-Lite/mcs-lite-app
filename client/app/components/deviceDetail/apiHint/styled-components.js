import styled from 'styled-components';
import { CopyButton, P, Hr } from 'mcs-lite-ui';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const CodeWrapper = styled.div`
  max-height: 250px;
  min-height: 3em;
  overflow-y: auto;
  border-radius: 3px;
  margin-top: 10px;
  padding: 5px 10px;
  border: 1px solid ${props => props.theme.color.grayDark};
  background-color: ${props => props.theme.color.grayLight};
`;

export const StyledCopyButton = styled(CopyButton)`
  position: absolute;
  margin-top: 5px;
  right: 15px;
`;

export const StyledP = styled(P)`
  margin-top: 5px;
`;

export const Body = styled.div`
  margin: 20px 0;
  
  > div + div {
    margin-top: 10px;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  
  > * {
    flex: 1;
  }
`;

export const StyledHr = styled(Hr)`
  margin-top: 5px;
`;

export const RadioGroup = styled.span`
  > *:first-child {
    margin-left: 5px;
  }

  label {
    margin-left: 5px;
  }
  
  > span + span {
    margin-left: 20px;
  }
`;
