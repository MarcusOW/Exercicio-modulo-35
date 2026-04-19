class ItemModel {
  image: string
  title: string
  description: string
  longDescription: string
  button: string
  price: number
  id: number

  constructor(
    image: string,
    title: string,
    description: string,
    longDescription: string,
    button: string,
    price: number,
    id: number
  ) {
    this.image = image
    this.title = title
    this.description = description
    this.longDescription = longDescription
    this.button = button
    this.price = price
    this.id = id
  }
}

export default ItemModel
