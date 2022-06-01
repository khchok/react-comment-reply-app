import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [topstories, setTopstories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          axios
            .get(
              `https://hacker-news.firebaseio.com/v0/item/${res.data[i]}.json`,
              {
                signal: controller.signal,
              }
            )
            .then((itemRes) => {
              let data = {
                ...itemRes.data,
                aging: Math.ceil(
                  Math.abs(
                    (Date.now() - new Date(itemRes.data.time * 1000)) / 36e6
                  )
                ),
              };
              setTopstories((prevState) => [...prevState, data]);
            })
            .catch((e) => {
              if (e.code !== "ERR_CANCELED") console.log(e);
            });
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <ul>
        {topstories &&
          topstories.map((story, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  navigate(`/story/${story.id}/comments`, { replace: true });
                }}
              >
                <div className="home-item">
                  <div>{story.title}</div>
                  <small>
                    {story.score} points by {story.by} {story.aging} hours ago |
                    hide | {story.kids?.length} comments
                  </small>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;
