import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  movies = [{title: 'test'}];
  selectedMovie:any;

  constructor(private api:ApiService) {
    this.getMovies();
    this.selectedMovie = {id:-1, title:'', desc:'', year:0};
  }

  getMovies = () => {
    this.api.getAllMovies().subscribe( //obtenemos los datos y los asignamos a la variable movies
      data => {
        this.movies = data;
      },
      error => {
        console.log(error); //para controlar el error
      }
    );
  }

  movieClicked = (movie:any) => {
    this.api.getOneMovie(movie.id).subscribe( //obtenemos los datos de una movie para mostrarlos
      data => {
        this.selectedMovie = data;
      },
      error => {
        console.log(error); //para controlar el error
      }
    );
  }

  updateMovie = () => {
    this.api.updateMovie(this.selectedMovie).subscribe( //obtenemos los datos para actualizar
      data => {
        this.getMovies();   //mostrar la lista de peliculas
      },
      error => {
        console.log(error); //para controlar el error
      }
    );
  }

  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe( //obtenemos los datos para crear
      data => {
        this.movies.push(data);   //push para guardar la data
      },
      error => {
        console.log(error); //para controlar el error
      }
    );
  }

  deleteMovie = () => {
    this.api.deleteMovie(this.selectedMovie.id).subscribe( //obtenemos la id de la pelicula a eliminar
      data => {
        this.getMovies();   //mostrar la lista de peliculas
      },
      error => {
        console.log(error); //para controlar el error
      }
    );
  }

}
