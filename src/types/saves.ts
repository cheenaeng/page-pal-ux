export interface IPage {
  id: string
  title: string
  img: {
    src: string
    alt?: string | undefined
  }
  lengthMin: number
  link: string
}
