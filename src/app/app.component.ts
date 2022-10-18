import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'url-parser-and-builder-app';
  public url!: URL;
  public urlParams!: any;
  public urlNew: any;
  public urlNewParams!: any;
  public urlNewComplete!: string;

  onClearUrl() {
    delete this.urlNew;
    this.urlNewComplete = "";
  }

  onParseUrl(urlForm: NgForm) {
    const methodName = "onParseUrl()";
    
    try {
      this.url = new URL(urlForm.value.url);
      this.urlNew = new URL(urlForm.value.url);

      const urlSearchParams = new URLSearchParams(this.url.search);
      this.urlParams = Object.fromEntries(urlSearchParams.entries());
      this.urlNewParams = Object.fromEntries(urlSearchParams.entries());
      this.urlNewComplete = "";
      
      console.log(this.url);
      console.log(this.urlParams);

    } catch (error) {
      console.error(`${methodName} ${urlForm.value.url} is not a valid URL - ${error}`);
    }
  }

  onBuildUrl(urlNewForm: NgForm) {
    const methodName = "onBuildUrl()";
    console.log(urlNewForm.value);
    try {
      this.urlNew = new URL(urlNewForm.value.href);
      this.urlNewComplete = urlNewForm.value.href;
      console.log(this.urlNew);

    } catch (error) {
      console.error(`${methodName} ${urlNewForm.value.url} is not a valid URL - ${error}`);
    }
  }

  onBuildUrlParams(urlNewParamsForm: NgForm) {
    let urlNewSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(urlNewParamsForm.value)) {
      urlNewSearchParams.append(key, value as string);
    }
    console.log(urlNewSearchParams.toString());
    this.urlNewParams = urlNewSearchParams;
    this.urlNew.search = this.urlNewParams.toString();
    this.urlNewComplete = this.urlNew.href;
  }
}
