class RestaurantModel {
  image: string
  title: string
  description: string
  infos: string[]
  button: string
  rating: number
  id: number

  constructor(
    image: string,
    title: string,
    description: string,
    infos: string[],
    button: string,
    rating: number,
    id: number
  ) {
    this.image = image
    this.title = title
    this.description = description
    this.infos = infos
    this.button = button
    this.rating = rating
    this.id = id
  }
}

export default RestaurantModel
