const generateDate = ( dateValue: number ) => {
  const date = new Date(dateValue);

  return `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`
}

export default generateDate;