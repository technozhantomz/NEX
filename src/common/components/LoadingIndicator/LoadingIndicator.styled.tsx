import { keyframes } from "styled-components";

import { styled } from "../../../ui/src";
import { colors } from "../../../ui/src/colors";
import { mixIns } from "../../../ui/src/mixins";

const bouncedelay = keyframes`
0%,
80%,
100% {
    -webkit-transform: scale(0);
    transform: scale(0);
}
40% {
    -webkit-transform: scale(1);
    transform: scale(1);
}
 `;

export const ThreeBounceWrpper = styled.div`
  & > div {
    width: 18px;
    height: 18px;
    background-color: ${colors.primaryColor};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${bouncedelay} 1.4s infinite ease-in-out;
    animation: ${bouncedelay} 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  & .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  & .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`;

type CircleWrapperProps = {
  isSmall?: boolean;
};

export const CircleWrapper = styled.div<CircleWrapperProps>`
  width: ${(props) => (props.isSmall ? "15px" : "22px")};
  height: ${(props) => (props.isSmall ? "15px" : "22px")};
  position: relative;

  .circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .circle:before {
    content: "";
    display: block;
    margin: 0 auto;
    width: 20%;
    height: 20%;
    background-color: ${colors.primaryColor};

    border-radius: 100%;
    -webkit-animation: ${bouncedelay} 1.2s infinite ease-in-out;
    animation: ${bouncedelay} 1.2s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .circle2 {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  .circle3 {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  .circle4 {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .circle5 {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
  }
  .circle6 {
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
  }
  .circle7 {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .circle8 {
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg);
  }
  .circle9 {
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg);
  }
  .circle10 {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  .circle11 {
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg);
  }
  .circle12 {
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg);
  }

  .circle2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .circle5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  .circle6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .circle7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .circle8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .circle9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .circle11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .circle12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
`;

export const LoadingOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1 !important;
  -webkit-transition: opacity linear 0.5s;
  transition: opacity linear 0.5s;
`;

export const LoadingPanel = styled.div`
  max-height: 130px;
  width: 320px;
  background-color: ${colors.white};
  opacity: 0.75;
  border: 0.25px solid ${colors.borderColorBase};
  ${mixIns.borderRadius};
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding-top: 10px;
  color: ${colors.textColor};
`;

export const Spinner = styled.div`
  width: 64px;
  height: 18px;
  margin: auto;
  position: absolute;
  top: 35px;
  left: 0;
  bottom: 0;
  right: 0;
  & > div {
    width: 18px;
    height: 18px;
    background-color: ${colors.primaryColor};
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${bouncedelay} 1.4s infinite ease-in-out;
    animation: ${bouncedelay} 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  & .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  & .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`;
