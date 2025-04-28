// A good practice to create a separate file that contains all of API calls
// so that you can keep all the networking operations of stuff related to API in one place and find it easily

const API_KEY = "874d38922b9895f4413af56f5c1acd7c";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query)}`
    );
    const data = await response.json();
    return data.results;
};