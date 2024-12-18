import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArticleList } from "./components/ArticleList";
import { Routes, Route } from "react-router";
import { SingleArticleView } from "./components/SingleArticleView";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="articles/:article_id" element={<SingleArticleView />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
