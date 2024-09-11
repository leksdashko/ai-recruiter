import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const optionsDefault = {
   page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      // default is 'portrait'
      orientation: 'landscape',
   },
   canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1
   }
};

export const createPDF = (targetElement, options) => {
	return generatePDF(targetElement, {...optionsDefault, ...options});
}