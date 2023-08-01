import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Locale } from './locale';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private localeState: { [key: string]: BehaviorSubject<boolean> } = {};

  private locales: Locale[] = [
    { id: 'en-US', name: 'English' },
    { id: 'es-ES', name: 'Spanish' },
    { id: 'fr-FR', name: 'French' },
    { id: 'de-DE', name: 'German' },
    { id: 'it-IT', name: 'Italian' },
    { id: 'pt-BR', name: 'Portuguese' },
    { id: 'ru-RU', name: 'Russian' },
    { id: 'zh-CN', name: 'Chinese' },
    { id: 'ja-JP', name: 'Japanese' },
    { id: 'ko-KR', name: 'Korean' },
    { id: 'ar-SA', name: 'Arabic' },
    { id: 'hi-IN', name: 'Hindi' },
    { id: 'tr-TR', name: 'Turkish' },
    { id: 'vi-VN', name: 'Vietnamese' },
    { id: 'th-TH', name: 'Thai' },
    { id: 'nl-NL', name: 'Dutch' },
    { id: 'el-GR', name: 'Greek' },
    { id: 'he-IL', name: 'Hebrew' },
    { id: 'pl-PL', name: 'Polish' },
    { id: 'sv-SE', name: 'Swedish' },
  ];

  constructor() {
    this.locales.forEach(locale => {
      this.localeState[locale.id] = new BehaviorSubject<boolean>(false);
    });
  }

  getLocaleState(id: string): Observable<boolean> {
    return this.localeState[id].asObservable();
  }

  toggleLocaleState(id: string): void {
    this.localeState[id].next(!this.localeState[id].value);
  }

  getChangedStates(): { [key: string]: string }[] {
    const changedStates = [];
    for (const localeId in this.localeState) {
      if (this.localeState.hasOwnProperty(localeId)) {
        if(this.localeState[localeId].value) {
          const localeName = this.locales.find(locale => locale.id === localeId)?.name || '';
          changedStates.push({ [localeName]: localeId });
        }
      }
    }
    return changedStates;
  }

  getLocales(): Locale[] {
    return this.locales;
  }
}
