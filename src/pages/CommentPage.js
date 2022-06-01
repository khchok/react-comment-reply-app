import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

const CommentPage = () => {
  const params = useParams();
  
  return <Comment storyid={params.id} />;
};

export default CommentPage;
