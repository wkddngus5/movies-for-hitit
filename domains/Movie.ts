class Movie {
    poster: string;
    title: string;
    type: string;
    year: string;
    imdbID: string;

    imdbRating: string;
    plot: string;
    director: string;
    writer: string;
    actors: string;
    runtime: string;
    genre: string;

    constructor({ Poster, Title, Type, Year, imdbID, imdbRating, Plot, Director, Writer, Actors, Runtime, Genre }) {
        this.poster = Poster;
        this.title = Title;
        this.type = Type;
        this.year = Year;
        this.imdbID = imdbID;

        this.imdbRating = imdbRating;
        this.plot = Plot;
        this.director = Director;
        this.writer = Writer;
        this.actors = Actors;
        this.runtime = Runtime;
        this.genre = Genre;
    }
} 


export default Movie;
