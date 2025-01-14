import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const View = styled.div`
  height: 100vh;
  max-width: 100%;
  min-width: 600px;
  position: relative;
  padding-top: 2rem;
`;

export const Container = styled.div`
    max-width: 1120px;
    height: calc(100% - 160px);
    justify-content: space-between;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 20px 2.4rem 0;
`

export const ChatBlock = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    margin-bottom: 20px;
`

export const Control = styled.div`
    height: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;

    textarea {
        resize: none;
        padding-right: 6rem;
    }
`

export const SendBtn = styled.div`
    position: absolute;
    right: 16px;
    border-radius: 5px;
    width: 26px;
    height: 26px;
    text-align: center;
    bottom: 12px;
    background: ${p => p.theme.colors.morMain};
`

export const Avatar = styled.div`
    height: 36px;
    min-width: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid; */
    background: ${p => p.color};
    font-weight: 400;
    font-size: 15px;
    border-radius: 4px;
`

export const AvatarHeader = styled.div`
    color: ${p => p.theme.colors.morMain}
    font-weight: 900;
    padding: 0 8px;
    font-size: 18px;
`

export const MessageBody = styled.div`
    font-weight: 400;
    padding: 0 8px;
    font-size: 18px;
`

export const ChatTitleContainer = styled.div`
    color: ${p => p.theme.colors.morMain}
    font-weight: 900;
    padding: 0 8px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
`

export const ChatAvatar = styled.div`
    display: flex;
    align-items: center;
`

export const CustomTextArrea = styled(TextareaAutosize)`
    background: transparent;
    box-sizing: border-box;
    width: 100%;
    font-size: 18px;
    border-radius: 12px;
    color: white;
    padding: 12px 16px;

    &::focus {
        outline: none;
    }
`

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  width: 100%;
  padding: 1.5rem 0;
  z-index: 2;
  right: 0;
  left: 0;
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  padding-bottom: 32px!important;
`;

export const TitleRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.label`
  font-size: 2.4rem;
  line-height: 3rem;
  white-space: nowrap;
  margin: 0;
  max-width: 1120px;
  font-weight: 600;
  color: ${p => p.theme.colors.morMain};
  margin-bottom: 4.8px;
  margin-right: 2.4rem;
  cursor: default;
  /* width: 100%; */

  @media (min-width: 1140px) {
  }

  @media (min-width: 1200px) {
  }
`;