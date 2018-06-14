import { Observable } from 'rxjs';
import { CustomTableColumnDefinition } from './columnDefinition.class';
import { CustomTableConfig } from './tableConfig.class';
export class CustomTableOptions {
  public records: Observable<Array<any>>;
  public columns: Array<CustomTableColumnDefinition>;
  public rowDefns: Array<any>;
  public config: CustomTableConfig;
  public callbacks: any;
}
