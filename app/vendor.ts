import 'es6-shim';
import 'es7-shim';
import 'web-animations-js';
import 'intl';
import 'intl/locale-data/jsonp/fr.js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

import '@angular/platform-browser';

/**
 * Be careful to never import ust 'rxjs';
 * in this case you would be importing the *ENTIRE* library which is huge
 */
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";


import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
