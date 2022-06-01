import { Route, Routes, useNavigate } from "react-router-dom";
import CommentPage from "./pages/CommentPage";
import HomePage from "./pages/HomePage";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="app-bar">
        <span className="cursor-pointer"
          onClick={() => {
            navigate("", { replace: false });
          }}
        >
          <b>Hacker News</b>
        </span>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="story/:id/comments" element={<CommentPage />} />
      </Routes>
    </>
  );
}

export default App;
