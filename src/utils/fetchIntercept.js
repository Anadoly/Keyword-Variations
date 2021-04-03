import fetchIntercept from 'fetch-intercept';
const API_URL = 'http://localhost:3001';

const unregister = fetchIntercept.register({
  request: (url, config) => {
    // Modify the url or config here
    const myHeaders = new Headers();
    config.headers = myHeaders;

    url = `${API_URL}/${url}`;
    return [url, config];
  },

  requestError: (error) => {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: (response) => {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        let error;
        switch (response.status) {
          case 12163:
            error = 'Please check you internet connection!';
            break;

          default:
            error = data.errors || response.statusText;

            break;
        }
        return Promise.reject(error);
      }
      return data || response;
    });
  },

  responseError: (error) => {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

export default unregister;
