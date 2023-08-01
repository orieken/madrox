// locale.component.ts

import { Component, OnInit } from '@angular/core';
import { LocaleService } from './locale.service';
import { Observable, of } from 'rxjs';
import { Locale } from './locale';

@Component({
  selector: 'app-locale',
  template: `
    <div *ngFor="let locale of locales$ | async" class="p-1">
      <input
        type="checkbox"
        class="form-checkbox h-5 w-5 text-blue-600"
        [checked]="locale.state | async"
        (click)="toggleLocaleState(locale.id)"
      >
      <span class="ml-2 text-gray-700">{{locale.name}}</span>
    </div>
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" (click)="save()">Save</button>
  `,
  styleUrls: ['./locale.component.css']
})
export class LocaleComponent implements OnInit {
  locales$!: Observable<any>;

  constructor(private localeService: LocaleService) { }

  ngOnInit(): void {
    const locales = this.localeService.getLocales().map((locale: Locale) => {
      return {
        ...locale,
        state: this.localeService.getLocaleState(locale.id)
      };
    });
    this.locales$ = of(locales);
  }

  toggleLocaleState(id: string) {
    this.localeService.toggleLocaleState(id);
  }

  save() {
    console.log(this.localeService.getChangedStates());
  }
}
