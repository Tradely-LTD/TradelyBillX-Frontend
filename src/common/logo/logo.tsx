import styled from "styled-components";

function Logo() {
  return (
    <LogoWrapper>
      <img style={{ height: "40px" }} src="../vite.svg" />
      <p className="text-4xl font-mono">AUFCDN</p>
    </LogoWrapper>
  );
}

export default Logo;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
