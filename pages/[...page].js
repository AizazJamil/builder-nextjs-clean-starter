// pages/[...page].js

import { builder, BuilderComponent, useIsPreviewing } from "@builder.io/react";
import Error from "next/error";

// Replace with your actual Public API Key from Builder.io
builder.init("3c1b321831a14fc4b2ffd64fb8e08f98");

export async function getStaticProps({ params }) {
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const pages = await builder.getAll("page", {
    options: { noTargeting: true },
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page }) {
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <Error statusCode={404} />;
  }

  return <BuilderComponent model="page" content={page} />;
}
