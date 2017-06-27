import {Routes} from "@angular/router";
import {Home} from "./home/home.component";
import { Strana2 } from './strana2/strana2.component';


export const ROUTES: Routes = [
  // Does not require authentication
  { path: '', component: Home },
  { path: 'strana2', component: Strana2 },
];
