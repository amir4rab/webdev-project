import readAllFiles from './readAllFiles';

const readMarkdown = async ( url: string, currentPage= 0, pageSize= 1 ) => {
  const sortedArray = await readAllFiles(url);

  const startPosition = pageSize * (currentPage - 1);
  const endPosition = pageSize * (currentPage);
  const slicedArray = sortedArray.slice( startPosition, endPosition );
  
  const pages = Math.ceil(sortedArray.length / pageSize);
  
  return ({
    contentArray: slicedArray,
    pages,
    currentPage,
  });
}

export default readMarkdown;