import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(private session: SessionService, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
		return this.session.islogged$
			.map(isLogged => {
				if (isLogged) {
					return true;
				}
				this.router.navigate(['login']);
				return false;
			})
			.take(1);
	}

}