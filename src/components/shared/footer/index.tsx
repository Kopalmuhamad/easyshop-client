import { Input } from "@/components/atoms/input";
import Container from "../container";
import {
  ArrowRight,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary py-4 mt-auto">
      <Container className="gap-y-6 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Join Our Newsletter</h1>
          <p className="text-sm">
            Drop your email below to get update about us, lastest news, tips,
            and more!
          </p>
          <div className="relative">
            <Input placeholder="Enter your email" />
            <ArrowRight
              size={16}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            />
          </div>
        </div>
        <div className="space-y-2">
          <header>
            <h1 className="text-lg font-semibold">Product Links</h1>
          </header>
          <ul className="space-y-2">
            <li>
              <Link to={"/"} className="text-sm">
                Categories
              </Link>
            </li>
            <li>
              <Link to={"/collections/new-arrivals"} className="text-sm">
                New Arrival
              </Link>
            </li>
            <li>
              <Link to={"/collections/features"} className="text-sm">
                Features
              </Link>
            </li>
            <li>
              <Link to={"/collections"} className="text-sm">
                Collections
              </Link>
            </li>
            <li>
              <Link to={"/collections/best-seller"} className="text-sm">
                Best Seller
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <header>
            <h1 className="text-lg font-semibold">Company</h1>
          </header>
          <ul className="space-y-2">
            <li>
              <Link to={"/"} className="text-sm">
                About
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                Blog
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                Careers
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                Contact
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                Services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <header>
            <h1 className="text-lg font-semibold">Support</h1>
          </header>
          <ul className="space-y-2">
            <li>
              <Link to={"/"} className="text-sm">
                Support Center
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                FAQ
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                Terms of service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <header>
            <h1 className="text-lg font-semibold">Get in touch</h1>
          </header>
          <ul className="flex items-center justify-start gap-4">
            <li>
              <Link to={"/"} className="text-sm">
                <InstagramIcon />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                <TwitterIcon />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-sm">
                <FacebookIcon />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
