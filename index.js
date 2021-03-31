const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs');

function isNullOrWhiteSpace(str) {
    if (str != undefined && str != null)
        str = str.toString();
    else
        str = "";
    return str.trim().length == 0;
}

function getMovies() {
    let moviesStr = fs.readFileSync('movies.json','UTF-8');
    let movies = JSON.parse(moviesStr);
    return movies;
}

app.post('/AddMovie', (req, res) => {
    let movie = req.body;
    if (isNullOrWhiteSpace(movie.Title)) {
        return response.send({ code: "-1", message: "Title cannot be empty" });
    }
    let movies = getMovies();
    movies.push(movie);
    fs.writeFileSync('movies.json', JSON.stringify(movies));
    res.send({ code: "0", movie: movie });
})

app.get('/FindMovies', (req, res) => {
    let query = request.query;
    if (isNullOrWhiteSpace(query.Title)) {
        return response.send({ code: "-1", message: "Title cannot be empty" });
    }
    let movies = getMovies();
    movies = movies.filter((movie)=> movie.Title != null && movie.Title.toLowerCase().indexOf(query.Title.toLowerCase()) !== -1)
    res.send({ code: "0", movies: movies });
})

app.post('/UpdateMovie', (req, res) => {
    let movie = req.body;
    if (isNullOrWhiteSpace(movie.Title)) {
        return response.send({ code: "-1", message: "Title cannot be empty" });
    }
    let movies = getMovies();
    filteredMovies = movies.filter((m)=> m.Title != null && m.Title === movie.Title);
    if(movies.length == 0){
        return response.send({ code: "-1", message: "Movie Not Found" });
    } else if(movies.length == 1){
        filteredMovies[0] = {
            ...filteredMovies[0],
            movie
        }
        fs.writeFileSync('movies.json', JSON.stringify(movies));
        res.send({ code: "0", movie: filteredMovies[0] });
    } else {
        return response.send({ code: "-1", message: "multiple matches are found" });      
    }
    
})

app.delete('/DeleteMovie/:Title', (req, res) => {
    var Title = request.params.Title;
    if (isNullOrWhiteSpace(Title)) {
        return response.send({ code: "-1", message: "Title cannot be empty" });
    }
    let movies = getMovies();
    filteredMovies = movies.filter((m)=> m.Title !== Title);
    fs.writeFileSync('movies.json', JSON.stringify(movies));
    res.send({ code: "0", message: "Successfully deleted" });
})

app.get('/CreateReport', (req, res) => {
    let query = request.query;
    if (!isNullOrWhiteSpace(query.Genre)) {
        let movies = getMovies();
        filteredMovies = movies.filter((m)=> movie.Major_Genre != null && movie.Major_Genre.toLowerCase().indexOf(query.Genre.toLowerCase()) !== -1);
        return response.send({ code: "0", Genre , movies: filteredMovies });
    } else if (!isNullOrWhiteSpace(query.Year)) {
        filteredMovies = movies.filter((m)=> m.Title !== Title);
        filteredMovies = movies.filter((m)=> movie.Release_Date != null && (new Date(movie.Release_Date)).getFullYear == query.Year);
        return response.send({ code: "0", Year, movies: filteredMovies  });
    } else {
        return res.send({ code: "0", movies: [] });
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

