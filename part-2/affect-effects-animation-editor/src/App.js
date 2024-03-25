import React, { useState } from 'react';
import CommonAncestor from './components/CommonAncestorComponent';
import EditorPlayGround from './components/EditorPlayGround';
import ImportAnimation from './components/ImportAnimation';
import ColorEditor from './components/ColorEditor';

export default function App() {

  return (
    <div>
      <EditorPlayGround />
      {/* <CommonAncestor /> */}
      {/* <ColorEditor /> */}
    </div>
  );
}
