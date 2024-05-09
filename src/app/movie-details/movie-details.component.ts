import { Component } from '@angular/core';
import { MovieDetails } from '../interface/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { TimePipe } from "../pipe/time.pipe";
import { CustomCurrencyPipe } from "../pipe/custom-currency.pipe";

@Component({
    selector: 'app-movie-details',
    standalone: true,
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.css',
    imports: [TimePipe, CustomCurrencyPipe]
})
export class MovieDetailsComponent {
    movie_id: string = '';
    movie: MovieDetails = {
        id: '',
        title: '',
        duration: '',
        budget: '',
        release_date: '',
        box_office: '',
        cinematographers: [],
        poster: '',
        producers: [],
        summary: ''
    };
    erroMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((movie_id) => {
            this.movie_id = movie_id['movieId'];
        });

        this.movieService.getMovieById(this.movie_id).subscribe((movie) => {
            this.movie = movie;
        },
            (err) => {
                console.log(err);
                this.erroMessage = err.error.error.message || err.message;
            });
    }

    backToHome(): void {
        this.router.navigate(['/movies']);
    }
}
