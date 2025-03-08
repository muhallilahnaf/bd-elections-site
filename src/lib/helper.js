import * as CSV from 'csv-string';

// convert string to title case, for table headers
export const toTitleCase = (str) => {
      return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      );
}

// read csv file and return list of seat and area
export const readCSV = async (path) => {
  const res = await fetch(path)
  const csvString = await res.text()
  const data = CSV.parse(csvString, { output: 'objects' });
  return data
}