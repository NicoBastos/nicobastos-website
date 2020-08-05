import Link from "next/link";
import axios from "axios";
const NOTION_BLOG_ID = "95528a1be5df4f0b8f912e63bc6c4885?";
import { NotionRenderer } from "react-notion";
export const getAllPosts = async () => {
  const posts = await axios
    .get(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`, {
      headers: {
        Authorization:
          "Bearer a53175bcdb5fee0e6b5651c60735cdc45e65d3fc9220f81439eb1e47a46e7f19ef378889e9aee498a646a8300b33b830bf5f4491615367bf7f4c9c1a16b61da95857910f6b9fec6bf635c6cd0a6c",
      },
    })
    .then(function (response) {
      const data = response.data;
      return data;
    });
  return posts;
};

export const getStaticProps = async () => {
  let posts = await getAllPosts();
  const mainPage = posts.filter((post) => post.slug === "about-me")[0];
  const blocks = await axios
    .get(`https://notion-api.splitbee.io/v1/page/${mainPage.id}`)
    .then((res) => res.data);
  return {
    props: {
      blocks,
      mainPage,
    },
  };
};

const HomePage = ({ blocks, mainPage }) => {
  return (
    <div className="m-auto lg:max-w-3xl md:max-w-lg flex flex-column ">
      <img
        src="https://i.imgur.com/1aKTwvi.png"
        className="bg-transparent h-32 absolute mt-20 "
      />
      <div className="m-auto mt-32">
        <NotionRenderer blockMap={blocks} />
      </div>
    </div>
  );
};

export default HomePage;
