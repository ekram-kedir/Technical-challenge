import React from 'react';
import { PhotoshopPicker } from 'react-color';

class  ColorEditor extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return <PhotoshopPicker onChangeComplete={ this.handleChangeComplete } />;
  }
}

export default ColorEditor