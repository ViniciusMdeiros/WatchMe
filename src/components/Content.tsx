import { memo, useState, useMemo } from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header'; 
import { api } from '../services/api';

import '../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps{
  selectedGenreId: number;
}

function ContentComponent({
  selectedGenreId,
}: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useMemo(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId])


  return (      

      <div className="container">
        
        <Header selectedGenreId={selectedGenreId}></Header>

        <main>

          <div className="movies-list">
            {movies.map(result => {
              return (
                <MovieCard 
                key={result.imdbID}
                title={result.Title} 
                poster={result.Poster} 
                runtime={result.Runtime} 
                rating={result.Ratings[0].Value} 
                />
              )
            })}
          
          </div>
        </main>
      </div>
  
  )

}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId);
})