import {Injectable} from "@angular/core";
import {StoreService} from "../store/store-service";
import {Http, Headers} from "@angular/http";
import {ConfigurationService} from "../conf/configuration-service";
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface Address {
	line: string;
	line2?: string;
	zipCode: string;
	city: string;
}

interface Profile {
	firstname: string;
	lastname: string;
	email: string;
	address: Address;
}

interface Session {
	token: string;
	profile: Profile;
}

interface Credentials {
	email: string;
	password: string;
}

@Injectable()
export class SessionService {

	private sessionKey = "session";

	public session$: Observable<Session> = new BehaviorSubject(null);
	public login$: Observable<any> = this.session$.filter(s => !!s);
	public logout$: Observable<any> = this.session$.pairwise().filter(v => !!v[0] && !v[1] );

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