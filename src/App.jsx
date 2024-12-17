import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArticleList } from "./components/ArticleList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <ArticleList />
      <Footer />
    </>
  );
}

export default App;
