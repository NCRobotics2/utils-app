import React from 'react';
import { View } from 'react-native';


const Head = ({position, size}) => {
  return(
    <View
       style={{
          backgroundColor: 'green',
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          borderRadius: size / 2
      }}
    />
  )
}

export default Head