import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import "../css/Home.css"
// Importing the API functions for searching and getting popular movies
import { searchMovies, getPopularMovies } from "../services/api"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    // apply getPopularMovies function here with applying useEffect methods, which define and call only once when there is changes(movies)
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // if this[] has any change then it will call the ()=>{} once, otherwise remain the same
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return


        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to load movies")
        }finally{
            setLoading(false)
        }

        setSearchQuery(""); //optional to clear the search input after submission
    }



    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        // Integrate with API data
                        (<MovieCard movie={movie} key={movie.id} />)
                    ))}
                </div>
            }
        </div>
    );
}

export default Home