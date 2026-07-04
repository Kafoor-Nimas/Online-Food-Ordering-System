import { NavLink } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <NavLink
            to="/"
            className="text-2xl font-bold text-orange-500"
            onClick={() => window.scrollTo(0, 0)}
          >
            🍕 FoodOrder
          </NavLink>
          <p className="max-w-[380px] mt-6 text-sm leading-relaxed">
            We deliver delicious food straight to your door — fast, fresh, and
            affordable. Order your favorite meals from the best restaurants and
            enjoy a seamless dining experience at home.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm text-gray-400">
        Copyright {new Date().getFullYear()} © FoodOrder. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
