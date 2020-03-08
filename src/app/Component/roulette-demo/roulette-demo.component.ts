import { Component, OnInit } from '@angular/core';
import { RouletteDemoService } from 'src/app/services/roulette-demo/roulette-demo.service';
import { LogService } from 'src/app/utility/services/common/log/log.service';
import { LoaderService } from 'src/app/utility/services/loader/loader.service';
import { GlobalConfig } from 'src/app/utility/configuration/gameConfig';
import { state, transition, animate, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-roulette-demo',
  templateUrl: './roulette-demo.component.html',
  styleUrls: ['./roulette-demo.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('500ms'))
    ])
  ]
})
export class RouletteDemoComponent implements OnInit {

  log: string;
  gameConfiguration: any;
  gameStats: any[];
  events: any[];
  gameResult: number;
  animateState: string;
  numberOfAnimations: number;

  constructor(private _rouletteDemoService: RouletteDemoService,
    private _logging: LogService,
    private _loaderService: LoaderService) {
      this.gameConfiguration = { colors: [], results: [] };
      this.log = '';
      this.gameStats = [];
      this.events = [];
      this.gameResult = -1;
      this.animateState = 'initial';
      this.numberOfAnimations = 3;
  }

  ngOnInit(): void {
    this._logging.getLocalLog().subscribe(res => {
      this.log += res;
    });

    this._logging.logToLocal("Loading game board");
    this.loadGameConfiguration();
    this.loadNewGame();
  }

  stratLoading = (): void => {
    this._logging.logToLocal('Spinning the wheel');
    this._loaderService.start();
  }

  stopLoading = (): void => {
    this._logging.logToLocal('Stopping the wheel');
    this._loaderService.stop();
  }

  loadGameConfiguration = (): void => {
    this._rouletteDemoService.getConfiguration().subscribe(
      (res => {
        this.gameConfiguration = res;
      })
    )
  }

  loadNewGame = (): void => {
    this._logging.logToLocal('Checking for new game');
    if(!GlobalConfig.initCall)
      this.updateStats();

    this._rouletteDemoService.getNextGame().subscribe(
      (res => {
        if(GlobalConfig.initCall) {
          this.updateStats();
          GlobalConfig.initCall = false;
        }

        if(res.fakeStartDelta <= 0) {
          this.loadGameResult(res.id)
          return;
        }

        this._logging.logToLocal(`sleeping for fakeStartDelta ${ res.fakeStartDelta } sec`);
        let fakeStartDeltaEventId = this.addEvent({
          message: `Game ${ res.id } will start in ${ res.fakeStartDelta } sec`,
          isTemp: false,
          updateTimeOfUI: true
        }); 

        let timedEvent = this.getEvent(fakeStartDeltaEventId);
        let timerId = setInterval(() => {
          let nextTime = res.fakeStartDelta--;
          if (nextTime > 0) {
            timedEvent.message = `Game ${ res.id } will start in ${ nextTime } sec`;
            return;
          }
          clearInterval(timerId);
          timedEvent.isTemp = true;
          this.loadGameResult(res.id);
        }, 1000);

      }),
      (err => {
        this._logging.logToLocal(`Error, sleeping for ${ GlobalConfig.retry_timer } and retrying`);
        setTimeout(() => {
          this.loadNewGame();
        }, GlobalConfig.retry_timer)
      })
    )
  }

  loadGameResult = (gameId: number): void => {
    let wheelSpinningEvent = this.addEvent({
      message: `Game ${ gameId }, the wheel is spinning`,
      isTemp: false,
      updateTimeOfUI: false
    })
    
    this._rouletteDemoService.getGame(gameId).subscribe(
      (res => {
        if(!res.result) {
          this._logging.logToLocal('Still no result continue spinning');
          setTimeout(() => {
            this.getEvent(wheelSpinningEvent).isTemp = true;
            this.loadGameResult(gameId);
          }, GlobalConfig.retry_timer);
        } else {
          this.getEvent(wheelSpinningEvent).isTemp = true;
          this._logging.logToLocal(`Result is ${ res.result }`);
          this.gameResult = res.result;


          let timerId = setInterval(() => {
            this.numberOfAnimations -= 1;
            if (this.numberOfAnimations >= 0) {
              this.animateState = this.animateState == 'initial' ? 'final' : 'initial';
              return;
            }
            clearInterval(timerId);
            this.gameResult = -1;
            this.animateState = 'initial';
            this.numberOfAnimations = 3;
          }, 1000);

          this.addEvent({
            message: `Game ${ gameId } ended, result is ${ res.result }`,
            isTemp: false,
            updateTimeOfUI: false
          });
          this.loadNewGame();
        }
      }),
      (err => {
        this._logging.logToLocal('Error getting results continue spinning');
        setTimeout(() => {
          this.getEvent(wheelSpinningEvent).isTemp = true;
          this.loadGameResult(gameId);
        }, GlobalConfig.retry_timer);
      })
    )
  }

  updateStats = (): void => {
    this._rouletteDemoService.getCurrentStats(200).subscribe(
      (res => {
        this.gameStats = res;
      })
    )
  }

  addEvent = (eventData : { message: string, isTemp: boolean, updateTimeOfUI: boolean }): number => {
    let currLength = this.events.length;
    eventData['Id'] = currLength++;
    this.events.push(eventData);
    return eventData['Id'];
  }

  getEvent = (eventId: number): any => {
    return this.events.filter(x => x.Id == eventId)[0];
  }
}
