export interface DataType {
  title: string;
  description: string;
  category: string;
  datatype_json: string;
}

export const datas: DataType[] = [
  {
    title: 'Name',
    description:
      'Randomly generated names for individuals and entities, like "John Doe."',
    category: 'General',
    datatype_json: 'name',
  },
  {
    title: 'Custom Field',
    description:
      'Provide custom data that will be generated sequentially or randomly.',
    category: 'Logistics',
    datatype_json: 'custom_field',
  },
  {
    title: 'Email id',
    description:
      'Fictional email addresses resembling real formats, e.g., "john.doe@example.com"',
    category: 'General',
    datatype_json: 'email',
  },
  {
    title: 'Phone number',
    description:
      'Fictional phone numbers based on the provided country code like "+1 (123) 456-7890" or "555-1234."',
    category: 'General',
    datatype_json: 'phone_number',
  },
  {
    title: 'Row id',
    description:
      'Sequentially generated unique identifiers for rows or records.',
    category: 'General',
    datatype_json: 'row_id',
  },
  {
    title: 'Address',
    description:
      'Fictional addresses with street names, city, state, and postal codes.',
    category: 'General',
    datatype_json: 'address',
  },
  {
    title: 'Airport code/ IATA code',
    description: 'Unique identifiers for airports and branches worldwide.',
    category: 'Logistics',
    datatype_json: 'airport_code',
  },
  {
    title: 'Company name',
    description: 'Randomly generated names for companies and organizations.',
    category: 'Logistics',
    datatype_json: 'company_name',
  },
  {
    title: 'Alphanumeric',
    description:
      'Randomly generated alphanumeric characters, including letters and numbers.',
    category: 'Logistics',
    datatype_json: 'alpha_numeric',
  },
  {
    title: 'Currency code',
    description:
      'Fictional currency codes used to represent different currencies, e.g., "USD," "EUR," "JPY."',
    category: 'Logistics',
    datatype_json: 'currency_code',
  },
  {
    title: 'Airline',
    description: 'Randomly generated names for fictional airlines.',
    category: 'Logistics',
    datatype_json: 'airline',
  },
  {
    title: 'Boolean',
    description: 'Boolean values representing true or false.',
    category: 'General',
    datatype_json: 'boolean',
  },
  {
    title: 'Naming series',
    description:
      'Sequentially generated naming series used for document numbering.',
    category: 'Logistics',
    datatype_json: 'naming_series',
  },
  {
    title: 'Date time',
    description:
      'Randomly generated date and time values for various scenarios.',
    category: 'Logistics',
    datatype_json: 'date_time',
  },
  {
    title: 'Number',
    description: 'Randomly generated numeric values for different use cases.',
    category: 'General',
    datatype_json: 'number',
  },
];
