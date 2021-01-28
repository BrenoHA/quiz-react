import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  border: 0;
  right: 0;
`;

const SVGWrapper = styled.svg`
  fill: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  cursor: pointer;
  &:hover {
    fill: currentColor
  }
  `;

// eslint-disable-next-line react/prop-types
export default function LinkedinCorner({ projectUrl }) {
  return (
    <Wrapper>
      <a href={projectUrl} target="_blank" rel="noreferrer">
        <SVGWrapper className="linkedinCorner" width="70" height="70" viewBox="0 0 30 30">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </SVGWrapper>
      </a>
    </Wrapper>
  );
}
