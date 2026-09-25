import ItemCard from './Itemcard'

const ItemList = ({ items, miLista, onToggle }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          enLista={miLista.some((i) => i.id === item.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default ItemList
