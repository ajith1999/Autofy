export interface DataType {
  title: string;
  description: string;
  category: string;
}

export const datas: DataType[] = [
  {
    title: 'Name',
    description:
      'Randomly generated names for individuals and entities, like "John Doe."',
    category: 'General',
  },
  {
    title: 'Custom Field',
    description:
      'Provide custom data that will be generated sequentially or randomly.',
    category: 'Logistics',
  },
  {
    title: 'Email id',
    description:
      'Fictional email addresses resembling real formats, e.g., "john.doe@example.com"',
    category: 'General',
  },
  {
    title: 'Phone number',
    description:
      'Fictional phone numbers based on the provided country code like "+1 (123) 456-7890" or "555-1234."',
    category: 'General',
  },
  {
    title: 'Row id',
    description:
      'Sequentially generated unique identifiers for rows or records.',
    category: 'General',
  },
  {
    title: 'Address',
    description:
      'Fictional addresses with street names, city, state, and postal codes.',
    category: 'General',
  },
  {
    title: 'Airport code/ IATA code',
    description: 'Unique identifiers for airports and branches worldwide.',
    category: 'Logistics',
  },
  {
    title: 'Company name',
    description: 'Randomly generated names for companies and organizations.',
    category: 'Logistics',
  },
  {
    title: 'Alphanumeric',
    description:
      'Randomly generated alphanumeric characters, including letters and numbers.',
    category: 'Logistics',
  },
  {
    title: 'Currency code',
    description:
      'Fictional currency codes used to represent different currencies, e.g., "USD," "EUR," "JPY."',
    category: 'Logistics',
  },
  {
    title: 'Airline',
    description: 'Randomly generated names for fictional airlines.',
    category: 'Logistics',
  },
  {
    title: 'Boolean',
    description: 'Boolean values representing true or false.',
    category: 'General',
  },
  {
    title: 'Naming series',
    description:
      'Sequentially generated naming series used for document numbering.',
    category: 'Logistics',
  },
  {
    title: 'Date time',
    description:
      'Randomly generated date and time values for various scenarios.',
    category: 'Logistics',
  },
  {
    title: 'Number',
    description: 'Randomly generated numeric values for different use cases.',
    category: 'General',
  },
];
