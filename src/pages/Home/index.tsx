import RestaurantsList from '../../components/RestaurantsList'
import RestaurantModel from '../../models/RestaurantModel'

import japones from '../../assets/image/restaurante-1.png'
import italiana from '../../assets/image/restaurante-2.png'

const restaurantsData: RestaurantModel[] = [
  {
    id: 1,
    image: japones,
    title: 'Hioki Sushi',
    description:
      'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!',
    infos: ['Destaque da semana', 'Japonesa'],
    rating: 4.9,
    button: 'Saiba mais'
  },
  {
    id: 2,
    image: italiana,
    title: 'La Dolce Vita Trattoria',
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    infos: ['Italiana'],
    rating: 4.6,
    button: 'Saiba mais'
  },
  {
    id: 3,
    image: italiana,
    title: 'La Dolce Vita Trattoria',
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    infos: ['Italiana'],
    rating: 4.6,
    button: 'Saiba mais'
  },
  {
    id: 4,
    image: italiana,
    title: 'La Dolce Vita Trattoria',
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    infos: ['Italiana'],
    rating: 4.6,
    button: 'Saiba mais'
  },
  {
    id: 5,
    image: italiana,
    title: 'La Dolce Vita Trattoria',
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    infos: ['Italiana'],
    rating: 4.6,
    button: 'Saiba mais'
  },
  {
    id: 6,
    image: italiana,
    title: 'La Dolce Vita Trattoria',
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    infos: ['Italiana'],
    rating: 4.6,
    button: 'Saiba mais'
  }
]

const Home = () => (
  <>
    <RestaurantsList restaurants={restaurantsData} />
  </>
)

export default Home
