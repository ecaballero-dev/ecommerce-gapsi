import styled from '@emotion/styled';

export default styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background: lightgray;
    width: 50%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 32px;
    font-weight: 700;
    padding: 0 32px;
    text-align: center;
    border-radius: 32px;
    z-index: 1000;
`;