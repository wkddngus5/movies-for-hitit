class Movie {
    poster: string;
    title: string;
    type: string;
    year: string;
    imdbID: string;

    constructor({ Poster, Title, Type, Year, imdbID }) {
        this.poster = Poster;
        this.title = Title;
        this.type = Type;
        this.year = Year;
        this.imdbID = imdbID;
    }
} 

export default Movie;
