type ApiMenuItem = {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}

export type ApiRestaurant = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: ApiMenuItem[]
}

export type MenuItem = {
  image: string
  price: number
  id: number
  name: string
  description: string
  portion: string
}

export type CartItem = MenuItem & {
  cartId: number
}

class RestaurantModel {
  id: number
  title: string
  highlighted: boolean
  type: string
  rating: number
  description: string
  cover: string
  menu: MenuItem[]

  constructor(apiRestaurant: ApiRestaurant) {
    this.id = apiRestaurant.id
    this.title = apiRestaurant.titulo
    this.highlighted = apiRestaurant.destacado
    this.type = apiRestaurant.tipo
    this.rating = apiRestaurant.avaliacao
    this.description = apiRestaurant.descricao
    this.cover = apiRestaurant.capa
    this.menu = apiRestaurant.cardapio.map((item) => ({
      image: item.foto,
      price: item.preco,
      id: item.id,
      name: item.nome,
      description: item.descricao,
      portion: item.porcao
    }))
  }
}

export default RestaurantModel
