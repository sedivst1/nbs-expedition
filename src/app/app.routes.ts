import {Routes} from "@angular/router";
import {Home} from "./home/home.component";
import { Strana2 } from './strana2/strana2.component';
import { Strana3 } from './strana3/strana3.component';


export const ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'strana2', component: Strana2 },
  { path: 'strana3', component: Strana3 },
];
