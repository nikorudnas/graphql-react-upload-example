import React from 'react';
import UploadCompo from './Upload';
import GetUploadCompo from './GetUploads';

export const App = () => (
  <div style={{ margin: 20 }}>
    <h1>File upload example</h1>
    <UploadCompo />
    <br />
    <br />
    <GetUploadCompo />
  </div>
);

export default App;
