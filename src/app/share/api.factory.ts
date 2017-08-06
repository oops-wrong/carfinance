import {ErrorCatcherService} from './error-catcher.service';

export class ApiFactory {

  public static $inject = [
    'errorCatcherService',
    'Restangular'
  ];

  private static errorCatcherService: ErrorCatcherService;
  private static Restangular: Restangular.IService;

  constructor(
    errorCatcherService: ErrorCatcherService,
    Restangular: Restangular.IService
  ) {
    ApiFactory.errorCatcherService = errorCatcherService;
    ApiFactory.Restangular = Restangular;
    ApiFactory.setErrorInterceptor();

    return ApiFactory.getConfig();
  }

  private static getConfig(): Restangular.IService {
    return ApiFactory.Restangular.withConfig(config => {
      config.setBaseUrl(ENV.LEAD_API);
      config.setRequestSuffix('/');
    });
  }

  private static setErrorInterceptor(): void {
    ApiFactory.Restangular.setErrorInterceptor((response: Restangular.IResponse) => {
      let paypoad = ApiFactory.errorCatcherService.getDefaultPayload();
      paypoad.description = `Request ${response.config.method} ${response.config.url} with status ${response.status}`;
      ApiFactory.errorCatcherService.sendErrorReport(paypoad);

      return response; // error not handled
    });
  }
}
