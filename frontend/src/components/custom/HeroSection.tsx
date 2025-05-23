/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { StrapiImage } from "./StrapiImage";

interface ImageProps {
    id: number;
    url: string;
    alternativeText: string;
}

interface LinkProps {
    id: number;
    url: string;
    text: string;
}

interface HeroSectionProps {
    data: {
        id: number;
        __component: string;
        heading: string;
        subHeading: string;
        image: ImageProps;
        Link: LinkProps;
    };
}


export function HeroSection({ data }: Readonly<HeroSectionProps>) {
    const { heading, subHeading, image, Link: linkData } = data;

    return (
        <header className="relative h-[600px] overflow-hidden">
            {/* <img
                alt="Background"
                className="absolute inset-0 object-cover w-full h-full"
                height={1080}
                src={imageURL}
                style={{
                    aspectRatio: "1920/1080",
                    objectFit: "cover",
                }}
                width={1920}
            /> */}
            <StrapiImage
                src={image.url}
                alt={image.alternativeText}
                height={600}
                width={1920}
                className="absolute inset-0 object-cover w-full h-full"
            />
            <div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-opacity-20"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                    {heading}
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl">
                    {subHeading}
                </p>
                <Link
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
                    href={linkData.url}
                >
                    {linkData.text}
                </Link>
            </div>
        </header>
    );
}
