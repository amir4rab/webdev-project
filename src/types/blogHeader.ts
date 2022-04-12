export type BlogHeader = {
  title: string,
  slug: string,
  thumbnail: string,
  date: string,
  author: string,
  shortInfo: string,
  tags: string[],
  titlePer: string,
  shortInfoPer: string,
  language: 'fa' | 'en'
}

export type BlogHeaderArray = BlogHeader[];