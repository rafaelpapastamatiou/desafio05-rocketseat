import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 15px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;

  button {
    font-size: 20px;
    color: #7159c1;
    border: none;
    background: none;
  }

  button + .nextPage {
    margin-left: 20px;
  }

  svg {
    margin-top: -0.125em;
    vertical-align: middle;
  }

  .state {
    padding: 5px;
    border: 2px solid #7169c1;
    color: #7159c1;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
  }

  .page {
    margin-left: auto;
    margin-right: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #7159c1;
  }
`;

export const NextPageButton = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    `}
`;

export const PreviousPageButton = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    `}
`;
