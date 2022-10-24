import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'url-parser-and-builder-app';
  faTimes = faTimes;
  public url!: URL;
  public urlParams!: any;
  public urlNew: any;
  public urlNewParams!: any;
  public urlNewComplete!: string;

  onClearUrl() {
    delete this.urlNew;
    this.urlNewComplete = '';
  }

  onParseUrl(urlForm: NgForm) {
    const methodName = 'onParseUrl()';
    try {
      this.url = new URL(urlForm.value.url);
      this.urlNew = new URL(urlForm.value.url);

      const urlSearchParams = new URLSearchParams(this.url.search);
      this.urlParams = Object.fromEntries(urlSearchParams.entries());
      this.urlNewParams = Object.fromEntries(urlSearchParams.entries());
      this.urlNewComplete = '';

    } catch (error) {
      console.error(
        `${methodName} ${urlForm.value.url} is not a valid URL - ${error}`
      );
    }
  }

  onBuildUrl(urlNewForm: NgForm) {
    const methodName = 'onBuildUrl()';
    console.log(`${methodName} urlNewForm ${JSON.stringify(urlNewForm.value)}`);
    try {
      this.urlNew = new URL(urlNewForm.value.href);
      this.urlNewComplete = urlNewForm.value.href;
      console.log(`${methodName} New URL ${this.urlNew}`);
    } catch (error) {
      console.error(
        `${methodName} ${urlNewForm.value.href} is not a valid URL - ${error}`
      );
    }
  }

  onDeleteUrlParam(paramKey: any) {
    const methodName = 'onDeleteUrlParam()';
    delete this.urlParams[paramKey];
    console.log(`${methodName} New urlParams: ${JSON.stringify(this.urlParams)}`);
    let urlNewParamsForm = <NgForm>{
      value: this.urlParams
    };
    this.onBuildUrlParams(urlNewParamsForm);
  }

  onBuildUrlParams(urlNewParamsForm: NgForm) {
    let urlNewSearchParams = new URLSearchParams();
    const methodName = 'onBuildUrlParams()';
    for (const [key, value] of Object.entries(urlNewParamsForm.value)) {
      urlNewSearchParams.append(key, value as string);
    }
    this.urlNewParams = urlNewSearchParams;
    this.urlNew.search = this.urlNewParams.toString();
    this.urlNewComplete = this.urlNew.href;
    console.log(`${methodName} New URL: ${this.urlNewComplete}`);
  }

  onParseExample(exampleUrl: any) {
    let ngForm = <NgForm>{
      value: {
        url: exampleUrl,
      },
    };
    this.onParseUrl(ngForm);
    (<HTMLInputElement>document.getElementById("url")).value = exampleUrl;
  }
}
