import  axios from "axios";

const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    params: {
        api_key: "ee11a55ebf9fcc978de20a1d45693669",
        language: "es-ES",
    }
});

export default movieDB;