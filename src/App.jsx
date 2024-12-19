import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArticleList } from "./components/ArticleList";
import { Routes, Route } from "react-router";
import { SingleArticleView } from "./components/SingleArticleView";
import { AuthorsView } from "./components/AuthorsView";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="articles/:article_id" element={<SingleArticleView />} />
        <Route path="authors" element={<AuthorsView />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
