const getVariations = (words) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  let params = '';
  words.forEach((word) => (params += `&word=${word}`));
  return fetch(`keyWords?${params}`, requestOptions)
    .then((variations) => {
      return { variations };
    })
    .catch((error) => {
      return Promise.reject({ errors: error });
    });
};

const variationsServices = {
  getVariations,
};
export default variationsServices;
