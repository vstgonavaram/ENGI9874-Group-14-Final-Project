import { Environment } from '../models/Environment';

export class GlobalConstants {
  public static isDebug = false;
  public static ENVIRONMENT = Environment.Development;
  public static API_URL = 'http://localhost:8888/';

  public static RoleJson: any = {
    univAdmin: 0,
    univUser: 1,
    student: 2,
  };
}
