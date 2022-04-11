export type BlogHeader = {
  title: string,
  slug: string,
  thumbnail: string,
  date: string,
  author: string,
  shortInfo: string,
  tags: string[],
}

export type BlogHeaderArray = BlogHeader[];