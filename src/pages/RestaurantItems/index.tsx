import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header'
import ItemList from '../../components/ItemList'
import ItemDetails from '../../components/ItemDetails'
import Cart from '../../components/Cart'
import RestaurantModel, {
  MenuItem,
  ApiRestaurant,
  CartItem
} from '../../models/RestaurantModel'

const RestaurantItems = () => {
  const { id } = useParams<{ id: string }>()
  const [restaurant, setRestaurant] = useState<RestaurantModel | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const cartQuantity = cartItems.length

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data: ApiRestaurant[]) => {
        const found = data.find((item) => item.id === Number(id))
        if (found) {
          setRestaurant(new RestaurantModel(found))
        }
      })
  }, [id])

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => [...prev, { ...item, cartId: Date.now() }])
    setSelectedItem(null)
  }

  const removeFromCart = (cartId: number) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId))
  }

  const openModal = (item: MenuItem) => {
    setSelectedItem(item)
  }

  if (!restaurant) {
    return <h4>Carregando...</h4>
  }

  return (
    <>
      <Header
        variante="items"
        mostrarCarrinho={true}
        cartQuantity={cartQuantity}
        onCartClick={() => setIsCartOpen(true)}
        restaurant={restaurant}
      />
      <ItemList items={restaurant.menu} onItemClick={openModal} />
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
