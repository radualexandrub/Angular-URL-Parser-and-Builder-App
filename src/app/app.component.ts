import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'url-parser-and-builder-app';
  faTimes = faTimes;
  public url!: URL;
  public urlParams!: any;
  public urlNew: any;
  public urlNewParams!: any;
  public urlsSavedToLocalStorage: any = [];

  ngOnInit(): void {
    this.urlsSavedToLocalStorage = JSON.parse(
      localStorage.getItem('urlsSavedToLocalStorage') || '[]'
    );
  }

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

    console.debug(
      `${methodName} urlNewForm ${JSON.stringify(urlNewForm.value)}`
    );
    try {
      this.urlNew = new URL(urlNewForm.value.href);
      console.debug(`${methodName} New URL ${this.urlNew}`);
    } catch (error) {
      console.error(
        `${methodName} ${urlNewForm.value.href} is not a valid URL - ${error}`
      );
    }
  }

  onDeleteUrlParam(paramKey: any) {
    const methodName = 'onDeleteUrlParam()';

    delete this.urlNewParams[paramKey];
    console.debug(
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

    console.debug(
      `${methodName} Old urlParams: ${JSON.stringify(this.urlNewParams)}`
    );
    for (const [key, value] of Object.entries(urlNewParamsForm.value)) {
      urlNewSearchParams.append(key, value as string);
    }
    this.urlNewParams = Object.fromEntries(urlNewSearchParams.entries());
    this.urlNew.search = urlNewSearchParams.toString();
    console.debug(
      `${methodName} New urlParams: ${JSON.stringify(this.urlNewParams)}`
    );
  }

  onAddExtraUrlParam(urlExtraSearchParam: NgForm) {
    const methodName = 'onAddExtraQueryParam()';
    let urlNewSearchParams = new URLSearchParams(this.urlNew.search);

    urlNewSearchParams.append(
      urlExtraSearchParam.value.newExtraParamKey,
      urlExtraSearchParam.value.newExtraParamValue
    );
    this.urlNewParams = Object.fromEntries(urlNewSearchParams.entries());
    this.urlNew.search = urlNewSearchParams.toString();
    console.debug(
      `${methodName} New urlParams: ${JSON.stringify(this.urlNewParams)}`
    );
    urlExtraSearchParam.reset();
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

  onSaveURLToLocalStorage() {
    const methodName = 'onSaveURLToLocalStorage()';
    this.urlsSavedToLocalStorage.push(this.urlNew.href);
    localStorage.setItem(
      'urlsSavedToLocalStorage',
      JSON.stringify(this.urlsSavedToLocalStorage)
    );
    console.debug(
      `${methodName} URL ${this.urlNew.href} was saved to LocalStorage`
    );
  }

  onDeleteURLFromLocalStorage(UrltoBeDeleted: any) {
    const methodName = 'onDeleteURLFromLocalStorage()';
    this.urlsSavedToLocalStorage = this.urlsSavedToLocalStorage.filter(
      (urlToBeMatched: any) => urlToBeMatched !== UrltoBeDeleted
    );
    localStorage.setItem(
      'urlsSavedToLocalStorage',
      JSON.stringify(this.urlsSavedToLocalStorage)
    );
    console.debug(
      `${methodName} URL ${UrltoBeDeleted} was deleted from LocalStorage`
    );
  }
}
