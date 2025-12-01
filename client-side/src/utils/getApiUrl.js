// export const getApiUrl = () => {
//   const hostname = window.location.hostname;
//   return `http://${hostname}:5000`;
// };
export const getApiUrl = () => {
  //console.log("API Base URL from env:", import.meta.env.VITE_API_BASE_URL);
  return import.meta.env.VITE_API_BASE_URL;
};
