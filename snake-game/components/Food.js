import React from 'react';
import { View } from 'react-native';


const Food = ({position, size}) => {
  return(
    <View
       style={{
          backgroundColor: 'red',
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

export default Food;