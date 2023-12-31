export type ApiData = {
  table_name: string;
  num_rows: number;
  file_format: string;
  columns_attributes: TableData[];
};

export interface TableData {
  name: string;
  dataType: string;
  datatype_json: string;
  options: Options;
}

export type Options = {
  min: number | undefined;
  max: number | undefined;
  min_date: Date | undefined;
  max_date: Date | undefined;
  value: (string | undefined)[];
  country_code: string;
  is_random: boolean | undefined;
  size: number | undefined;
  html_value: string | undefined;
  format: string | undefined;
};
