import Navbar from "../navbar";
import Footer from "../footer";
import Carousel from "../homePage/carousel";
import ContactUsContent from "./ContactUsContent";
import ContactUsForm from "./ContactUsForm";
import "./navBar.css"; 
// import CartPage from "./CartPage";

function ContactUs() {
  return (
    <>
      <Navbar className="products-navbar" />
      <Carousel/>
      <ContactUsContent/>
      <ContactUsForm/>
      <Footer />
    </>
  );
}

export default ContactUs;
