import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
import qs from 'qs'

const homepageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: '*'
    }
  }
}, {
  encodeValuesOnly: true,
})

async function getStrapiData(path: string) {
  const baseURL = 'http://localhost:5000';
  const url = new URL(path, baseURL);
  url.search = homepageQuery;
  const strapiURL = url.toString();

  try {
    const res = await fetch(strapiURL);
    const data = await res.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page');
  const { blocks } = strapiData;

  return (
    <main >
      <HeroSection data={blocks[0]} />
    </main>
  );
}
