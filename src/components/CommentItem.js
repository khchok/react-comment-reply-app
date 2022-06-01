import axios from "axios";
import he from "he";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
const CommentItem = ({ id }) => {
  const [comment, setComment] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        signal: controller.signal,
      })
      .then((res) => {
        let commentData = {
          ...res.data,
          aging: Math.ceil(
            Math.abs((Date.now() - new Date(res.data.time * 1000)) / 36e6)
          ),
        };
        setComment(commentData);
      })
      .catch((e) => {
        if (e.code !== "ERR_CANCELED") console.log(e);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <ul>
      {comment && comment.text && (
        <li key={comment.id}>
          <small>
            <span className="cursor-pointer">{comment.by}</span> {comment.aging}{" "}
            hours ago | next [-]
          </small>
          <div className="comment">{ReactHtmlParser(he.decode(comment.text))}</div>
          <p className="reply">
            <u>reply</u>
          </p>
          {comment.kids &&
            comment.kids.map((kid) => {
              return <CommentItem key={kid} id={kid} />;
            })}
        </li>
      )}
    </ul>
  );
};

export default CommentItem;
