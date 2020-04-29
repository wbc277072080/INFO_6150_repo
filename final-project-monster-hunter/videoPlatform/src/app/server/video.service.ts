import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Video} from '../models/Video';
import {User} from '../models/User';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoResource: string;
  videoResourceURL: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  cors = {
    headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
  };

  /**
   * constructor
   */
  constructor(private http: HttpClient) {
    this.videoResource = 'videos';
    this.videoResourceURL = `${environment.serverBaseURL}/${this.videoResource}`;
  }

  /**
   * GET: get video by id
   * @param id the Id of the video to be searched
   */
  getVideoById(id: string): Observable<Video> {
    const url = `${this.videoResourceURL}/${id}`;
    return this.http.get<Video>(url).pipe(
      catchError(this.handleError<Video>(`getVideo id = ${id}`))
    );
  }

  /**
   * GET: get the author of this video
   */
  getAuthor(video: Video): Observable<User> {
    const url = `${this.videoResourceURL}/auth/${video.auth}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`get author from video id = ${video.id}`))
    );
  }

  /**
   * GET: get the videos from the same author
   * @Param id author id of the video
   */
  getAllVideosFromAuthor(id: string): Observable<Array<Video>> {
    const url = `http://localhost:3000/videos/find/${id}`;
    return this.http.get<Video[]>(url);
    // pipe(
    // catchError(this.handleError<Video[]>(`get videos by user id = ${video.id}`))
    // );
  }

  /**
   * GET: get all of the videos form DB
   */
  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoResourceURL).pipe(
      catchError(this.handleError<Video[]>(`getVideos`))
    );
  }

  /**
   * PUT: update the video
   */
  updateVideo(video: Video): Observable<Video> {
    console.log(`video id = ${video.id}`);
    const url = `${this.videoResourceURL}/${video.id}`;
    return this.http.put(url, video, this.httpOptions).pipe(
      catchError(this.handleError<any>(`update video id = ${video.id}`))
    );
  }

  /**
   * DELETE: delete the video
   */
  deleteVideo(video: Video): Observable<Video> {
    const url = `${this.videoResourceURL}/${video.id}`;
    return this.http.delete<Video>(url, this.httpOptions).pipe(
      catchError(this.handleError<Video>(`delete video id = ${video.id}`))
    );
  }

  /**
   * GET: find video by tag
   * @param tag the video with same tag to be found
   */
  getVideoByTag(tag: string): Observable<Video[]> {
    const url = `${this.videoResourceURL}/findByTag/${tag}`;
    return this.http.get<Video[]>(url).pipe(
      catchError(this.handleError<any>(`get videos by tag ${tag}`))
    );
  }

  /**
   * POST: upload the video
   */
  uploadVideo(video: Video): Observable<Video> {
    const url = `${this.videoResourceURL}/upload`;
    return this.http.post<Video>(url, video, this.cors).pipe(
      catchError(this.handleError<Video>(`upload video`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /************** URL Method *****************/
  getVideoURL(url: string): string {
    return `https://www.youtube.com/embed/${url}`;
  }

  getVideoImgURL(url: string): string {
    return `http://i.ytimg.com/vi/${url}/mqdefault.jpg`;
  }
}
