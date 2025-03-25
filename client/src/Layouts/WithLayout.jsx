import Header from "../components/layout/header/header";
import Footer from "../components/layout/Footer/Footer";
import ScrollToTopButton from "../components/layout/ScrollToTopButton/ScrollToTopButton";

const WithLayout = (WrappedComponent) => {
  return (props) => (
    <div className="flex flex-col">
      <Header />
      <main className="pt-16 min-h-screen">
        <WrappedComponent {...props} />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default WithLayout;
