import {Component} from "@angular/core";
import {SessionService, Profile, Session} from "../components/session/session.service";

@Component({
	selector: 'n9-header',
	templateUrl: 'header.component.html'
})
export class HeaderComponent {
	profile: Profile;
	constructor(private session: SessionService) {
		this.session.session$.subscribe(s => this.onProfileChange(s));
	}

	onProfileChange(session: Session) {
		this.profile = session ? session.profile : null;
	}
}