import ProductContainer from "./ProductContainer"

function ProductGrid({ products, loadCartItems }) {
  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductContainer
          key={product.id}
          product={product}
          loadCartItems={loadCartItems}
        />
      ))}
    </div>
  )
}

export default ProductGrid
