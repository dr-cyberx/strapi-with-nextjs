import { Button } from "@/components/ui/button";


async function getStrapiData(url: string) {
  const baseURL = 'http://localhost:1337';
  try {
    const res = await fetch(baseURL + url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page');
  const { title, description } = strapiData?.data;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title ?? '-'}</h1>
      <p className="text-xl mt-4">{description ?? '-'}</p>
    </main>
  );
}
