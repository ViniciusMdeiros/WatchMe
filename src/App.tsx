import { useEffect, useState, useCallback} from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

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

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  const handleClickButton = useCallback(
    (selectedGenreId:number) : void => {
      setSelectedGenreId(selectedGenreId)
    },[]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres = {genres} selectedGenreId = {selectedGenreId} handleClickButton = {handleClickButton} />
      <Content selectedGenreId = {selectedGenreId}/>
    </div>
  )
}