import styled from '@emotion/styled';
import React, { Component } from 'react';
import { keyframes } from '@emotion/react';

const ldsRing = keyframes`
  0% { 
    transform: rotate(0deg);
  }
  100% { 
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 23px;
  height: 23px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    margin: 8px;
    border: 8px solid #5eb5ac;
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #5eb5ac transparent transparent transparent;
  }
  div:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  div:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;

export default class Loader extends Component {
  render() {
    return (
      <LoaderWrapper className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoaderWrapper>
    );
  }
}
