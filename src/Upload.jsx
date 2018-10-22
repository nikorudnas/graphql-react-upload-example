import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';

const UPLOAD_FILE = gql`
  mutation uploadFiles($files: Upload!) {
    uploadfiles(files: $files)
  }
`;

const styles = {
  dropZone: {
    cursor: 'pointer',
    maxWidth: 200,
    maxHeight: 200,
  },
  dropZoneLabelStyle: {
    margin: 10,
  },
  listItemStyle: {
    margin: 10,
  },
  SendButton: {
    maxWidth: 200,
  },
};

class Upload extends Component {
  state = {
    filesDropped: null,
  };

  filesDropped = files => {
    const filesToShow = [];
    files.forEach(val => {
      filesToShow.push(val.name);
    });
    this.setState({ filesDropped: filesToShow });
  };

  async uploadFiles(uploadresources) {
    const inputFiles = document.getElementById('fileZone').files;

    if (inputFiles.length > 0) {
      try {
        await uploadresources({
          variables: {
            files: inputFiles,
          },
        });
        document.getElementById('fileZone').value = '';
        this.setState({ filesDropped: null });
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert('Please add files to dropzone first!');
    }
  }

  render() {
    const { filesDropped } = this.state;
    return (
      <>
        <div style={styles.dropZone}>
          <Dropzone
            inputProps={{ id: 'fileZone' }}
            onDropAccepted={this.filesDropped}
          >
            <p style={styles.dropZoneLabelStyle}>
              Click here to select files to be uploaded
            </p>
          </Dropzone>
        </div>
        <p>Files added to sendlist:</p>
        {filesDropped &&
          filesDropped.map((name, i) => (
            <li style={styles.listItemStyle} key={name + i.toString()}>
              {name}
            </li>
          ))}
        <Mutation mutation={UPLOAD_FILE} refetchQueries={['GetFiles']}>
          {(uploadresources, { loading, error }) => (
            <>
              <Button
                variant="outlined"
                onClick={() => this.uploadFiles(uploadresources)}
                color="primary"
                style={styles.SendButton}
                autoFocus
              >
                Send
              </Button>
              {loading && <div>Sending...</div>}
              {error && <div>{error.toString()}</div>}
            </>
          )}
        </Mutation>
      </>
    );
  }
}

export default Upload;
