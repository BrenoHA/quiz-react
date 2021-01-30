import React from 'react';
import { Lottie } from '@crello/react-lottie';
import Widget from '../Widget';
import loadingAnimation from '../../screens/Quiz/animations/3010-bb8.json';

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando Quiz</h1>
      </Widget.Header>
      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>

    </Widget>
  );
}
