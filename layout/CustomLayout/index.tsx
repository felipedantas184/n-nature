import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Cart from "./Cart";

const Layout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [cartOpen, setCartOpen] = useState<boolean>(false)

	const toggle = () => {
		setIsOpen(!isOpen);
    setCartOpen(false)
	}
  const toggleCart = () => {
		setCartOpen(!cartOpen);
    setIsOpen(false)
	}

  return (
    <>
      <Navbar toggle={toggle} toggleCart={toggleCart} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Cart cartOpen={cartOpen} toggleCart={toggleCart} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;