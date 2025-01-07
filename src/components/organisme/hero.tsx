import Container from "../shared/container";
import { buttonVariants } from "../atoms/button";
import Particles from "../atoms/particles";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/theme-provider";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HeroHighlight, Highlight } from "../atoms/hero-highlight";
import { motion } from "framer-motion";

const Hero = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <div className="relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={600}
        ease={200}
        color={color}
        refresh
      />
      <Container className="min-h-[70vh] h-full flex items-center justify-center">
        <div className="flex items-start md:items-center justify-center flex-col">
          <HeroHighlight className="text-start md:text-center text-4xl md:text-5xl font-bold font-playfair uppercase">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              Welcome to
              <Highlight className="mx-2">
                Easyshop
              </Highlight>
            </motion.h1>
          </HeroHighlight>
          <p className="text-start md:text-center mt-4 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
          <Link
            to={"/collections"}
            className={cn(buttonVariants({ variant: "default" }), "mt-5")}
          >
            Explore our collections
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
