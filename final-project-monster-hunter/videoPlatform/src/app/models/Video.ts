import {Comment} from './Comment';
export class Video {
  id: string;
  description: string;
  auth: string;
  title: string;
  url: string;
  createdDate: Date;
  like: any[]; // 存的userId,喜欢这个视频的人
  unlike: any[];
  comments: any[];
  tag: string;
  history: any[];
  constructor(author: string, description: string, url: string, title: string) {
    this.auth = author;
    this.description = description;
    this.url = url;
    this.title = title;
  }
}
