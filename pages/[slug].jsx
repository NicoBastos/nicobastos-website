import { useState } from "react";
import Head from "next/head";
import { NotionRenderer } from "react-notion";
import axios from "axios";
import { getAllPosts } from "./index";
import classes from "./[slug].module.css";
// Get all posts again
export async function getStaticProps(slug) {
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug.params.slug);

  const blocks = await axios
    .get(`https://notion-api.splitbee.io/v1/page/${post.id}`)
    .then((res) => res.data);

  return {
    props: {
      blocks,
      post,
    },
  };
}

const BlogPost = ({ post, blocks }) => {
  if (!post) return null;

  return (
    <div className={classes.slug}>
      <Head>
        <title>{post.title}</title>
      </Head>

      <div>
        <NotionRenderer blockMap={blocks} />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/${row.slug}`),
    fallback: false,
  };
}

export default BlogPost;
