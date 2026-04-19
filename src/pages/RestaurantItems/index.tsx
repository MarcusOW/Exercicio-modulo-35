import { useState } from 'react'

import Header from '../../components/Header'
import ItemList from '../../components/ItemList/indes'
import ItemModel from '../../models/ItemModel'
import ItemDetails from '../../components/ItemDetails'
import Cart from '../../components/Cart'

import pizzaMarguerita from '../../assets/image/item.png'

const ItemsData: ItemModel[] = [
  {
    id: 1,
    image: pizzaMarguerita,
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    longDescription:
      'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.',
    button: 'Mais detalhes',
    price: 60.9
  },
  {
    id: 2,
    image: pizzaMarguerita,
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    longDescription:
      'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.',
    button: 'Mais detalhes',
    price: 60.9
  },
  {
    id: 3,
    image: pizzaMarguerita,
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    longDescription:
      'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.',
    button: 'Mais detalhes',
    price: 60.9
  },
  {
    id: 4,
    image: pizzaMarguerita,
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    longDescription:
      'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.',
    button: 'Mais detalhes',
    price: 60.9
  },
  {
    id: 5,
    image: pizzaMarguerita,
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    longDescription:
      'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.',
    button: 'Mais detalhes',
    price: 60.9
  },
  {
    id: 6,
    image: pizzaMarguerita,
    title: 'Pizza Marguerita',
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    longDescription:
      'A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante, coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.',
    button: 'Mais detalhes',
    price: 60.9
  }
]

const RestaurantItems = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemModel | null>(null)

  const cartQuantity = cartItems.length

  const addToCart = (item: ItemModel) => {
    setCartItems([...cartItems, { ...item, cartId: Date.now() }])
    setSelectedItem(null)
  }

  const removeFromCart = (cartId: number) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId))
  }

  const openModal = (item: ItemModel) => {
    setSelectedItem(item)
  }

  return (
    <>
      <Header
        variante="items"
        mostrarCarrinho={true}
        cartQuantity={cartQuantity}
        onCartClick={() => setIsCartOpen(true)}
      />
      <ItemList items={ItemsData} onItemClick={openModal} />
      <ItemDetails
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        onAddToCart={addToCart}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
      />
    </>
  )
}

export default RestaurantItems
