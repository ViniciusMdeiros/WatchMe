import { useEffect, useState } from 'react';
import { api } from '../services/api';

import '../styles/header.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface HeaderProps{
  selectedGenreId: number;
}

export function Header(props: HeaderProps) {

  const selectedGenreId = props.selectedGenreId;
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (      
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
  )

}