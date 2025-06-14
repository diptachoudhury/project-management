'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


interface FeatureProps {
    id: number;
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
    imageAlt: string;
    imageOnLeft?: boolean;
}


function FeatureSection({
  heading,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt,
  imageOnLeft = false,
}:FeatureProps) {

   const contentOrderClass = imageOnLeft ? 'md:order-2' : 'md:order-1';
   const imageOrderClass = imageOnLeft ? 'md:order-1' : 'md:order-2';

   return(
    <>
        <div className="container mx-auto max-w-screen-lg px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14">
            <motion.section
             className={`flex flex-col justify-center p-6  ${contentOrderClass}`}
            initial ={{opacity:0, x:imageOnLeft?100:-100}} 
            whileInView={{ opacity:1, x:0}}
            viewport={{once:true, amount:0.3}} 
            transition={{ duration: 0.8, ease: "easeOut" }}
             >
                <h2 className="text-lg font-extrabold text-gray-600 mb-4 leading-tight">
                    {heading}
                </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    {description}
                </p>
                <Link href={buttonLink}>
                    <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700  transition-all duration-300"
                    >
                    {buttonText}
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                    </motion.button>
                </Link>
            </motion.section>

            <motion.section
            className= {`relative w-full h-64 md:h-65 overflow-hidden  ${imageOrderClass} `}
             initial ={{opacity:0, x:imageOnLeft?-100:100}} 
            whileInView={{ opacity:1, x:0}}
            viewport={{once:true, amount:0.3}} 
            transition={{ duration: 0.8, ease: "easeOut"}}
            >
                <Image
                src={imageUrl}
                alt={imageAlt}
                layout="fill"
                objectFit="contain"
                />
            </motion.section>


        </div>

    </>
   )
}


export default function HomePageSections() {
  const features: FeatureProps[] = [
    {
      id: 1,
      heading: 'Streamlined Task Management',
      description: 'Organize, track, and prioritize your tasks with ease. Our intuitive interface helps you stay on top of deadlines and collaborate efficiently with your team.',
      buttonText: 'View My Tasks',
      buttonLink: '/tickets/my-tasks',
      imageUrl: '/Element.png',
      imageAlt: 'Task Management Interface',
      imageOnLeft: false, // Text on left, Image on right
    },
    {
      id: 2,
      heading: 'Collaborate with Your Team',
      description: 'Connect with your organization members, assign tasks effortlessly, and foster a productive environment. See who\'s doing what at a glance.',
      buttonText: 'Explore Members',
      buttonLink: '/members',
      imageUrl: '/Work-Together.png',
      imageAlt: 'Team Collaboration Dashboard',
      imageOnLeft: true, // Image on left, Text on right
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      {features.map((feature) => (
        <FeatureSection key={feature.id} {...feature} />
      ))}
    </div>
  );
}