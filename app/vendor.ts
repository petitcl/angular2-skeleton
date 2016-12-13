import 'es6-shim';

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

import '@angular/platform-browser';

/**
 * Be careful to never import ust 'rxjs';
 * in this case you would be importing the *ENTIRE* library which is huge
 */
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
