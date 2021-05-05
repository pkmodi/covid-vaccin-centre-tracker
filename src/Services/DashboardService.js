import axios from "axios";


export const getAll = async (url) => {
  return await axios
    .get(url)
    .then((response) => { return response })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

