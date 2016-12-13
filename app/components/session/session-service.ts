import {Injectable} from "@angular/core";
import {StoreService} from "../store/store-service";
import {Http, Headers} from "@angular/http";
import {ConfigurationService} from "../conf/configuration-service";
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

export interface Address {
	line: string;
	line2?: string;
	zipCode: string;
	city: string;
}

export interface Profile {
	firstname: string;
	lastname: string;
	email: string;
	address: Address;
}

export interface Session {
	token: string;
	profile: Profile;
}

export interface Credentials {
	email: string;
	password: string;
}

@Injectable()
export class SessionService {

	private sessionKey = "session";

	public session$: Observable<Session> = new BehaviorSubject(null);
	public login$: Observable<any> = new Subject();
	public logout$: Observable<any> = new Subject();

	//TODO: use ApiHttpClient (conf aware, session aware)
	constructor(
		private store: StoreService,
		private conf: ConfigurationService,
		private http: Http
	) {
	}

	load() {
		const session: Session = this.store.get(this.sessionKey);
		if (!session) return;
		(<Subject<any>>this.logout$).next();
		this.openSession(session);
	}

	login(credentials: Credentials) {
		const options = {
			headers: new Headers({ 'Content-Type': 'application/json' })
		};

		//TODO: find a way to make this a hot observable ?
		return this.http.post(this.conf.getAsString("api") + "/login", credentials, options)
			.map(res => res.json())
			.catch(error => Observable.throw(error.json().error || 'Server error'))
			.map(
				res => {
					// console.log(res);
					this.openSession(res);
					(<Subject<any>>this.login$).next();
					return <Session>res;
				}
			);
	}

	logout() {
		this.closeSession();
	}

	private openSession(session: Session) {
		this.store.set(this.sessionKey, session);
		(<BehaviorSubject<Session>>this.session$).next(session);
	}

	private closeSession() {
		this.store.del(this.sessionKey);
		(<BehaviorSubject<Session>>this.session$).next(null);
	}
}