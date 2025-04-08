/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import qs from 'qs'
import { FeatureSection } from "@/components/custom/FeaturesSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            Link: {
              populate: true,
            },
          },
        },
        "layout.features-section": {
          populate: {
            feature: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseURL = getStrapiURL();
  const url = new URL(path, baseURL);
  url.search = homePageQuery;
  const strapiURL = url.toString();
  console.log(strapiURL);


  try {
    const res = await fetch(strapiURL);
    const data = await res.json();
    // console.dir(data, { depth: null });
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.log(error);
  }
}


const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component = blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page');

  const { blocks } = strapiData || [];

  return <main>{blocks.map(blockRenderer)}</main>;
}
