import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { YoutubeServiceService } from 'src/shared/services/youtube-service.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  channelID: string = 'UCbtVfS6cflbIXTZ0nGeRWVA';
  maxResults: string = '10';
  pageToken: string;
  googleToken: string = 'AIzaSyDlyCA3ffPHQJp2Mk8TrgF_feH5FqD9Vq8';
  searchQuery: string = 'ravetraintv -kissing';
  posts: any = [];
  onPlaying: boolean = false;

  constructor(public http: HttpClient, public nav: NavController, public ytPlayer: YoutubeServiceService,) { 
    this.loadSettings();
  }


  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }

  fetchData(): void {

    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&q=' + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

    if (this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get<any>(url).subscribe((data:any) => {
      console.log("data is",data.items);
      this.posts = this.posts.concat(data.items); 
    });
  }

  loadSettings(): void {
    this.fetchData();
  }
  openSettings(): void {
    console.log("TODO: Implement openSettings()");
  }
  playVideo(e, post): void {
    console.log(post);
    this.onPlaying = true;
    console.log("Video Id is ... ",post.id.videoId);
    YoutubeVideoPlayer.openVideo(post.id.videoId);
    // this.ytPlayer.launchPlayer(post.id, post.snippet.title);
  }
  loadMore(): void {
    console.log("TODO: Implement loadMore()");
  }

}
