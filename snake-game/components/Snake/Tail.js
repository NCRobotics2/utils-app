import React from 'react';
import { View } from 'react-native';


const Tail = ({position, size}) => {
  return(
    <View
       style={{
          backgroundColor: 'lightgreen',
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

export default Tail;