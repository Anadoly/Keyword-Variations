/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Global, css } from '@emotion/react';
import { Colors } from './';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
          img {
            max-width: 100%;
          }
        }
        *,
        ::before,
        ::after {
          box-sizing: inherit;
        }
        html,
        body {
          scroll-behavior: smooth;
          padding: 0;
          margin: 0;
        }
        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }
        body {
          background: ${Colors.white};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;

          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: ${Colors.GreenColor};
          h1,
          h2,
          h3 {
            font-weight: bold;
          }
        }
        button,
        a {
          cursor: pointer;
          outline: none;
          text-decoration: none;
          color: inherit;
          &:focus {
            outline: none;
            color: inherit;
          }
          &:visited {
            color: inherit;
          }
        }
        .visually-hidden {
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }
        svg:not(:root) {
          overflow: initial;
        }
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}
    />
  );
};

export default GlobalStyles;
