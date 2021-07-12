import { environment } from '../../environments/environment';

export class Logger {
  private _timestamp: number;

  constructor(private _area: string, private _hasTimestamp: boolean = false) {
    this._timestamp = Date.now();
  }

  log(message: string): void {
    if (!environment.production) {
      if (this._hasTimestamp) {
        console.log(
          `%c[${this._area}] ${message} +${Date.now() - this._timestamp}ms.`,
          // 'color: chartreuse'
          'color: greenyellow'
        );
      } else {
        console.log(`[${this._area}] ${message}.`);
      }
    }
  }

  error(error: string): void {
    if (!environment.production) {
      if (this._hasTimestamp) {
        console.error(
          `[${this._area}] ${error} +${Date.now() - this._timestamp}ms.`
        );
      } else {
        console.error(`[${this._area}] ${error}.`);
      }
    }
  }

  debug(message: string): void {
    if (!environment.production) {
      if (this._hasTimestamp) {
        console.debug(
          `[${this._area}] ${message} +${Date.now() - this._timestamp}ms.`
        );
      } else {
        console.debug(`[${this._area}] ${message}.`);
      }
    }
  }

  warn(warn: string): void {
    if (!environment.production) {
      if (this._hasTimestamp) {
        console.warn(
          `[${this._area}] ${warn} +${Date.now() - this._timestamp}ms.`
        );
      } else {
        console.warn(`[${this._area}] ${warn}.`);
      }
    }
  }
}
