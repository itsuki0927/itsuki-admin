import { baseURI } from '@/graphql';
import { getToken } from '@/utils/auth';
import { timeoutPromise } from '@/utils/promise';

export interface UploadFileResponse {
  data: {
    uploadFile: string;
  };
}

const uploadFetch = async (prefix: string, file: File) => {
  const headers = new Headers();
  const token = getToken();
  if (!token) {
    window.location.href = '/login';
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('need login');
  }

  headers.append('Authorization', token);

  const formdata = new FormData();
  formdata.append(
    'operations',
    `{ "query": "mutation uploadFile($prefix: String, $file: FileUpload){ uploadFile(prefix: $prefix, file: $file) }" , "variables": { "file": null, "prefix": "${prefix}" } }`
  );
  formdata.append('file', file);
  formdata.append('map', '{ "file": ["variables.file"] }');

  const fetcher = async () => {
    try {
      const response = await fetch(baseURI, {
        method: 'POST',
        headers,
        body: formdata,
      });
      const { data } = (await response.json()) as UploadFileResponse;
      return data;
    } catch (error) {
      console.log('error', error);
      return Promise.reject(error);
    }
  };

  return timeoutPromise(fetcher, 20000);
};

export default uploadFetch;
