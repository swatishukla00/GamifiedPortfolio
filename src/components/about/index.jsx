import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="  text-xl md:text-2xl text-left w-full capitalize">
           Swati Shukla - Aspiring Software Developer & UX Designer
          </h2>
          <p className="font-light  text-xs sm:text-sm md:text-base   ">
            I am Swati Shukla, an aspiring software developer currently pursuing my MSc in Informatics at the University of Delhi. With a strong academic background in Electronics (BSc Hons.), I possess a solid foundation in programming languages such as Python, C, HTML, and data tools like Tableau. My passion for UX design is complemented by experience in cloud technologies and big data. Through roles like Summer Fellowship Developer and freelance UX Designer, I have applied my skills to real-world projects, including developing virtual labs for remote learning. Eager to bring creativity and technical expertise to innovative software development and UX design projects.
          </p>
        </ItemLayout>

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            3+ <sub className="font-semibold text-base">projects</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            0+{" "}
            <sub className="font-semibold text-base">years of experience(freshie here)&#128521;&#128514;</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}
        >
           <img
            className="w-full h-auto"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=swatishukla00&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false"
            alt="SwatiShukla"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <img
            className="w-full h-auto"
            src="https://github-readme-stats.vercel.app/api?username=swatishukla00&show_icons=true&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false"
            alt="SwatiShukla"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=bootstrap,css,tensorflow,figma,gcp,git,py,androidstudio,opencv,blender,vite,github,html,js,linux,c,cpp,mysql,netlify,nextjs,nodejs,npm,react,tailwind,threejs,vscode`}
            alt="SwatiShukla"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src="https://github-readme-streak-stats.herokuapp.com?user=swatishukla00&theme=dark"
            alt="GitHub Streak"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/swatishukla00/"
            target="_blank"
            className="w-full"
          >
            <img
              className="w-full h-auto"
              src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/pin/?username=swatishukla00&repo=SwatiShukla-Portfolio&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&description_lines_count=2`}
              alt="SwatiShukla"
              loading="lazy"
            />
          </Link>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
