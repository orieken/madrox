import { Observable } from 'rxjs';

export interface Locale {
  id: string;
  name: string;
  state?: Observable<boolean>;
}
