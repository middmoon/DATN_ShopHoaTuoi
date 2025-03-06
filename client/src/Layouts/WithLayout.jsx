import Header from "../components/layout/header/header";
import Footer from "../components/layout/Footer/Footer";

const WithLayout = (WrappedComponent) => {
  return (props) => (
    <>
      <Header />
      <WrappedComponent {...props} />
      <Footer />
    </>
  );
};

export default WithLayout;
