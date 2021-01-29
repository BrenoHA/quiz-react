import React from 'react';
import ReactLoading from 'react-loading';
import Widget from '../Widget';

// eslint-disable-next-line react/prop-types
const LoadingAnimation = ({ type, color }) => (
  <ReactLoading type={type} color={color} height="20%" width="18%" />
);

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando Quiz</h1>
      </Widget.Header>
      <Widget.Content>
        <LoadingAnimation type="cylon" color="#ffffff" />
      </Widget.Content>

    </Widget>
  );
}
