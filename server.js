/**
 * Midterm API Project - COMP229 Summer 2025
 * 
 * Challenge: Implement the API logic for managing a collection of movies!
 * 
 * Here's the deal:
 * You have a server running on port 3000, and an array of movie objects.
 * Your mission, should you choose to accept it, is to implement the missing logic
 * for each of the following API endpoints. 
 * 
 * Endpoints:
 * 1. GET /api/movies       - Retrieve the full list of movies.
 * 2. GET /api/movies/filter?genre=[genre name] - Retrieve movies by genre match.
 * 3. GET /api/movies/:id   - Retrieve a movie by its index.
 * 4. POST /api/movies      - Add a new movie to the collection.
 * 5. PUT /api/movies/:id   - Update a movie by its index.
 * 6. DELETE /api/movies/:id - Remove a movie from the collection by its index.
 * 
 * The array of movies is already defined for you, but you need to bring the logic
 * to life. Test your work using tools like Postman, Thunder Client, or Insomnia.
 * 
 * Submission Requirements:
 * 1. **Screenshots**: Provide screenshots of your API tests, clearly showing:
 *    - There should be 1 screenshot per Endpoint (6 in total)
 *    - The API request URL and method.
 *    - The request body (where applicable).
 *    - The successful response with proper HTTP status codes.
 *    Use Postman, Thunder Client, Insomnia, or another similar API testing tool.
 * 
 * 2. **Code Submission**: 
 *    - Include your code in a **.zip** file.
 *    - Provide a GitHub link to your repository containing the project.
 *    - Make sure all screenshots are clearly visible in your submission.
 * 
 * Good luck, and may your code be bug-free!
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of movie objects
let movies = [
  { title: 'The Matrix', genre: 'Sci-Fi', year: 1999, director: 'The Wachowskis' },
  { title: 'Inception', genre: 'Sci-Fi', year: 2010, director: 'Christopher Nolan' },
  { title: 'The Godfather', genre: 'Drama', year: 1972, director: 'Francis Ford Coppola' },
  { title: 'Pulp Fiction', genre: 'Crime', year: 1994, director: 'Quentin Tarantino' },
  { title: 'The Dark Knight', genre: 'Action', year: 2008, director: 'Christopher Nolan' },
  { title: 'Spider-Man: Into the Spider-Verse', genre: 'Action', year: 2018, director: 'Peter Ramsey' },
  { title: 'The Super Mario Bros. Movie', genre: 'Comedy', year: 2023, director: 'Aaron Horvath' }
];

// Set the port for the server
const PORT = 3000;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/movies
// Description: Get all movies
// Task: Implement logic to return the full list of movies
app.get('/api/movies', (req, res) => {
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/movies/filter?genre=[genre name]
// Description: Filter movies by genre
// Task: Implement logic to return movies matching the specified genre
app.get('/api/movies/filter', (req, res) => {
  const genre = req.query.genre;
  if (!genre) {
    return res.status(400).json({ message: "Genre query parameter is required" });
  }

  try {
    const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    if (filteredMovies.length === 0) {
      return res.status(404).json({ message: "No movies found for the specified genre" });
    }
    res.status(200).json(filteredMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/movies/:id
// Description: Get a specific movie by ID
// Task: Implement logic to return a movie by its index (ID)
app.get('/api/movies/:id', (req, res) => {
  try {
    const movie = movies.at(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
      res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/movies
// Description: Add a new movie
// Task: Implement logic to add a new movie to the array
app.post('/api/movies', (req, res) => {
  try {
    const { title, genre, year, director } = req.body;
    if (!title || !genre || !year || !director) {
      return res.status(400).json({ message: "All fields (title, genre, year, director) are required" });
    }
    const newMovie = { title, genre, year, director };
    movies.push(newMovie);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/movies/:id
// Description: Update a movie by ID
// Task: Implement logic to update a movie by its index (ID)
app.put('/api/movies/:id', (req, res) => {
  try {
    const movieIndex = req.params.id;
    if (movieIndex < 0 || movieIndex >= movies.length) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const { title, genre, year, director } = req.body;
    if (!title || !genre || !year || !director) {
      return res.status(400).json({ message: "All fields (title, genre, year, director) are required" });
    }

    const updatedMovie = { title, genre, year, director };
    movies[movieIndex] = updatedMovie;
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/movies/:id
// Description: Remove a movie by ID
// Task: Implement logic to remove a movie by its index (ID)
app.delete('/api/movies/:id', (req, res) => {

  /*
  try {
    const movie = movies.at(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
      res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  */


  try {
    const deletedMovieID = req.params.id;
    if (deletedMovieID < 0 || deletedMovieID >= movies.length) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movies.splice(deletedMovieID, 1); // Remove the movie from the array
    res.status(200).json({message: "Movie deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
