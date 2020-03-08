import { logging } from 'protractor';
import { GenericService } from './../../utility/services/common/generic/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogService } from 'src/app/utility/services/common/log/log.service';
import { RouteUrl } from 'src/app/utility/configuration/RouteUrl'
 
@Injectable({
  providedIn: 'root'
})
export class RouletteDemoService extends GenericService {

  constructor(http: HttpClient, logging: LogService) {
    super(http, logging);
  }

  getConfiguration() {
    return this.get(RouteUrl.configuration);
  }

  getNextGame() {
    return this.get(RouteUrl.nextGame);
  }

  getCurrentStats(limit: number) {
    let params = new HttpParams();
    params = params.append('limit', limit.toString());

    return this.get(RouteUrl.stats, params);
  }

  getGame(gameId: number) {
    return this.get(RouteUrl.game + gameId);
  }
}
