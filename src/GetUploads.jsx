import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

// Fetch users data and pass to ProfileForm

const GETFILES = gql`
  query GetFiles {
    getfiles {
      _id
      filename
      url
      createdAT
    }
  }
`;

const REMOVE_FILE = gql`
  mutation removeFile($filename: String!) {
    removefile(filename: $filename)
  }
`;

const styles = {
  download: {
    marginLeft: 10,
  },
  remove: {
    color: 'red',
    marginLeft: 10,
    cursor: 'pointer',
  },
};

const removeFile = async (removefile, filename) => {
  try {
    await removefile({
      variables: {
        filename,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const GetUploads = () => (
  <Query query={GETFILES}>
    {({ loading, error, data }) => (
      <>
        {loading && <div>Loading...</div>}
        {error && <div>{error.toString()}</div>}
        {data &&
          data.getfiles &&
          data.getfiles.map(item => (
            <div key={item._id}>
              <span>{item.filename}</span>
              <a
                style={styles.download}
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
                download
              >
                Preview/Download
              </a>
              <Mutation
                mutation={REMOVE_FILE}
                variables={{ filename: item.filename }}
                refetchQueries={['GetFiles']}
              >
                {removefile => (
                  <>
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyUp={() => removeFile(removefile, item.filename)}
                      onClick={() => removeFile(removefile, item.filename)}
                      style={styles.remove}
                    >
                      Remove
                    </span>
                  </>
                )}
              </Mutation>
            </div>
          ))}
      </>
    )}
  </Query>
);

export default GetUploads;
