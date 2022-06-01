import axios from "axios";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

const Comment = ({ storyid }) => {
  const [story, setStory] = useState({});
  useEffect(() => {
    const controller = new AbortController();    
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${storyid}.json`, {
        signal: controller.signal,
      })
      .then((res) => {
        let storyData = {
          ...res.data,
          aging: Math.ceil(
            Math.abs((Date.now() - new Date(res.data.time * 1000)) / 36e6)
          ),
        };
        setStory(storyData);
      })
      .catch((e) => {
        if (e.code !== "ERR_CANCELED") console.log(e);
      });

    return () => {
      controller.abort();
    };
  }, [storyid]);

  return (
    <>
      <h1>{story.title}</h1>
      <small>
        {story.score} points by {story.by} {story.aging} hours ago | hide |{" "}
        {story.kids?.length} comments
      </small>

      {story.kids &&
        story.kids.map((kid, i) => {
          return <CommentItem key={`${storyid}_${kid}_${i}`} id={kid} />;
        })}
    </>
  );
};

export default Comment;
