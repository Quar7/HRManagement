import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Hotel } from './models/hotel';

@Injectable({
    providedIn: 'root'
})

export class HotelService {
    private hotelApiUrl = 'https://localhost:44326/api/hotel';

    constructor(private http: HttpClient) {
    }

    getHotelList(): Observable<Hotel[]> {
        return this.http.get<Hotel[]>(this.hotelApiUrl)
            .pipe(catchError(this.handleError));
    }

    getHotel(id: number): Observable<Hotel> {
        return this.http.get<Hotel>(`${this.hotelApiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    updateHotel(hotel: Hotel): Observable<Hotel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Hotel>(`${this.hotelApiUrl}/${hotel.id}`, hotel, { headers })
            .pipe(catchError(this.handleError));
    }

    addHotel(hotel: Hotel): Observable<Hotel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Hotel>(this.hotelApiUrl, hotel, { headers })
            .pipe(catchError(this.handleError));
    }

    deleteHotel(id: number): Observable<string> {
        return this.http.delete<string>(`${this.hotelApiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    // Error handler
    private handleError(err: HttpErrorResponse) {
        let errorLogMessage = '';
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errorMessage = err.error.message;
            errorLogMessage = `Error: ${errorMessage}`;
        } else {
            // The backend returned an unsuccessful response code.
            errorMessage = err.error; // Komunikat z web api
            errorLogMessage = `Status code: ${err.status}, Error message: ${err.error}, ${err.message}`;

            if (err.error['text'] != null) {
                errorMessage = err.error['text']; // Komunikat z web api, obejście dla delete który zwraca error ze statusem OK
            }
        }
        console.error(errorLogMessage);
        return throwError(errorMessage);
    }
}
