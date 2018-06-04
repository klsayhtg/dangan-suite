import React from 'react';
import styled from 'styled-components';
import logo from './image/logo.png';
import background from './image/background.jpg';
import userIcon from './image/user-icon.png';
import lockIcon from './image/lock-icon.png';

const RootDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  background-size: cover;
  background: url(${background}) center;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
`;

const DefaultField = styled.div`
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 30px;
  color: white;
`;

const InputIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 14px;
  opacity: 0.9;
`;

const InputField = DefaultField.extend`
  & > input {
    width: 60%;
    background: transparent;
    border: 0;
    font-size: 14px;
    color: #e5e5e5;
    ::-webkit-input-placeholder {
      color: #999999;
    }
    :-moz-placeholder {
      color: #999999;
    }
    ::-moz-placeholder {
      color: #999999;
    }
    :-ms-input-placeholder {
      color: #999999;
    }
    ::placeholder {
      color: #999999;
    }
  }
`;

const SubmitButton = DefaultField.extend`
  cursor: pointer;
  background: rgba(255, 76, 141, 0.7);
  &:hover {
    background: rgba(255, 76, 141, 0.6);
  }
`;

export default class Register extends React.Component {
  render() {
    return (
      <RootDiv>
        <LogoImg src={logo} />
        <InputField><InputIcon src={userIcon}/><input placeholder="ID" /></InputField>
        <InputField><InputIcon src={lockIcon}/><input placeholder="Password" /></InputField>
        <SubmitButton>등록</SubmitButton>
      </RootDiv>
    )
  }
}