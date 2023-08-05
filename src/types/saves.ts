export interface IPage {
  id: string
  title: string
  img?: {
    src: string
    alt?: string | undefined
  }
  lengthMin?: number
  link: string
}

export interface IBookmark {
  archived: boolean
  id: string
  link: string
  domain: string
  image: string
  title: string
}
export interface GenericResponseBookmark {
  data: IBookmark[]
  total_records: number
}
