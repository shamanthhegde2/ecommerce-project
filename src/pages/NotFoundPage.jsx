import Header from "../componenets/Header"
import "./NotFoundPage.css"

function NotFoundPage({ cartItems }) {
  return (
    <>
      <Header cartItems={cartItems} />
      <div className="not-found">
        <p>Page Not Found</p>
        <p>404</p>
      </div>
    </>
  )
}

export default NotFoundPage
