import { Injectable } from '@angular/core';
import { MovieModel } from './moviemodel';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieList: MovieModel[] = [
    new MovieModel('Avenger Infinity War','Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality. ','http://riset.club/images/1.jpg'),
    new MovieModel('Joker','Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks --       the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he is part of the world around him. ','http://riset.club/images/2.jpg'),
    new MovieModel('OnWard','Teenage elf brothers Ian and Barley embark on a magical quest to spend one more day with their late father.        Like any good adventure, their journey is filled with cryptic maps, impossible obstacles and unimaginable discoveries.','http://riset.club/images/3.jpg'),
    new MovieModel('Knives Out', 'The circumstances surrounding the death of crime novelist Harlan Thrombey are mysterious, but there is one thing that renowned Detective Benoit Blanc knows for sure -- everyone in the wildly dysfunctional Thrombey family is a suspect. ','http://riset.club/images/4.jpg'),
    new MovieModel('Mulan', 'A young Chinese maiden disguises herself as a male warrior in order to save her father. ', 'http://riset.club/images/5.jpg'),
    new MovieModel('Tenet','In a twilight world of international espionage, an unnamed CIA operative, known as The Protagonist, is recruited by a mysterious organization called Tenet to participate in a global assignment that unfolds beyond real time.', 'http://riset.club/images/6.jpg')
  ];
  constructor() { }
}
