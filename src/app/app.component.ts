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

  onClearUrl() {
    delete this.urlNew;
  }

  onParseUrl(urlForm: NgForm) {
    const methodName = 'onParseUrl()';

    try {
      this.url = new URL(urlForm.value.url);
      this.urlNew = new URL(urlForm.value.url);

      const urlSearchParams = new URLSearchParams(this.url.search);
      this.urlParams = Object.fromEntries(urlSearchParams.entries());
      this.urlNewParams = Object.fromEntries(urlSearchParams.entries());
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
      console.log(`${methodName} New URL ${this.urlNew}`);
    } catch (error) {
      console.error(
        `${methodName} ${urlNewForm.value.href} is not a valid URL - ${error}`
      );
    }
  }

  onDeleteUrlParam(paramKey: any) {
    const methodName = 'onDeleteUrlParam()';

    delete this.urlNewParams[paramKey];
    console.log(
      `${methodName} New urlParams: ${JSON.stringify(this.urlNewParams)}`
    );
    let urlNewParamsForm = <NgForm>{
      value: this.urlNewParams,
    };
    this.onBuildUrlParams(urlNewParamsForm);
  }

  onBuildUrlParams(urlNewParamsForm: NgForm) {
    const methodName = 'onBuildUrlParams()';
    let urlNewSearchParams = new URLSearchParams();

    console.log(
      `${methodName} Old urlParams: ${JSON.stringify(this.urlNewParams)}`
    );
    for (const [key, value] of Object.entries(urlNewParamsForm.value)) {
      urlNewSearchParams.append(key, value as string);
    }
    this.urlNewParams = Object.fromEntries(urlNewSearchParams.entries());
    this.urlNew.search = urlNewSearchParams.toString();
    console.log(
      `${methodName} New urlParams: ${JSON.stringify(this.urlNewParams)}`
    );
  }

  onParseExample(exampleUrl: any) {
    let ngForm = <NgForm>{
      value: {
        url: exampleUrl,
      },
    };
    this.onParseUrl(ngForm);
    (<HTMLInputElement>document.getElementById('url')).value = exampleUrl;
  }
}
