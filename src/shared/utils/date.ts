export enum DateFormatEnum {
  DEFAULT = 'DD.MM.YY',
  LONG = 'Month D, Year',
  ARABIC = 'DD/MM/YY',
}

/**
 * Formats the input date string based on the specified date format.
 *
 * @param {string} inputDate - The input date string.
 * @param {DateFormatEnum} format - The desired date format.
 * @returns {string} - The formatted date string.
 * @throws {Error} - Throws an error for unsupported date formats.
 */

export const formatDate = (
  inputDate: string,
  format: DateFormatEnum = DateFormatEnum.DEFAULT,
): string => {
  const dateObject = new Date(inputDate);

  switch (format) {
    case DateFormatEnum.DEFAULT: {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const formattedDate = dateObject.toLocaleDateString('en-GB', options);
      return formattedDate.replace(/\//g, '.');
    }
    case DateFormatEnum.LONG: {
      const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      };
      return dateObject.toLocaleDateString('en-US', options);
    }
    case DateFormatEnum.ARABIC: {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      };
      return dateObject.toLocaleDateString('ar-SA', options);
    }
    default: {
      throw new Error('Unsupported date format');
    }
  }
};
