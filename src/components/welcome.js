import React from 'react';
import Controls from '../containers/controls.js';

// function based "dumb" component with no state
const Welcome = () => {
  return (
    <div>
      react+webpack+babel+eslint starter
      <Controls />
    </div>

  );
};


export default Welcome;
