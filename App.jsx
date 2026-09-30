import { useState } from 'react'
import './App.css'

function App() {

  const [movieName, setMovieName] = useState("")
  const [genre, setGenre] = useState("")
  const [movieList, setMovieList] = useState([])
  const [tempData, setTempData] = useState([...movieList])

  let onHandleSubmit = () => {

    if (movieName === "" || genre === "") {
      return
    }

    let newMovie = {
      name: movieName,
      genre: genre,
      isFavorite: false
    }
    setMovieList([...movieList, newMovie])
    setTempData([...tempData,newMovie])

    setMovieName("")
    setGenre("")
  }

  let onHandleFavorite = (ind) => {

    // let result = movieList.map((movie,index) => {

    //   if (index === ind) {
    //     return {
    //       ...movie,
    //       isFavorite: !movie.isFavorite
    //     }
    //   }
    //   return movie
    // })

    let result=[...movieList]
    result[ind].isFavorite = !result[ind].isFavorite
    setMovieList(result)
    setTempData(result)
  }

  let onHandleFilter=(data)=>{

        let res=[]

        if(data=="favorite"){
            res=tempData.filter((value)=>value.isFavorite==true)
        }else if(data=="not favorite"){
            res=tempData.filter((value)=>value.isFavorite==false)
        }else{
            // setMovieList(tempData)
            res=tempData
        }

        setMovieList(res)
    }

  return (
    <>
      <div className="main">
        <h2>Movie List</h2>

        <div className="inputTask">
          <input type="text" placeholder="Movie Name" value={movieName} onChange={(e)=>{setMovieName(e.target.value)}}/>
          <input type="text" placeholder="Genre" value={genre} onChange={(e)=>{setGenre(e.target.value)}}/>
          <button onClick={onHandleSubmit}>Add Movie</button>
        </div>

        <div>
          <button type="button" onClick={()=>onHandleFilter("all")}>All</button>
          <button type="button" onClick={()=>onHandleFilter("favorite")}>Favourite</button>
          <button type="button" onClick={()=>onHandleFilter("not favorite")}>Not Favourite</button>
        </div>

        <div>
          {movieList.map((movie,index) => (
            <div className="listItem" key={index}>
              <h3>{movie.name}</h3>
              <p>Genre: {movie.genre}</p>
              {movie.isFavorite == true ? (
                <button
                  onClick={() => {onHandleFavorite(index)}}>
                  Favourite
                </button>
              ) : (
                <button
                  onClick={() => {onHandleFavorite(index)}}>
                  Not Favourite
                </button>)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App