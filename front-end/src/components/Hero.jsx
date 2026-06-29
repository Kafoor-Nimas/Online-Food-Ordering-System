import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${assets.header_img})` }}
      className="h-[50vw] sm:h-[40vw] md:h-[34vw] my-8 mt-24 sm:mt-28 md:mt-30 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-38 rounded-2xl bg-no-repeat bg-cover bg-center relative max-w-[1200px]"
    >
      <div className="absolute bottom-[8%] left-[5%] flex flex-col items-start gap-2 md:gap-[1.5vw] max-w-[60%] sm:max-w-[55%] md:max-w-[50%]">
        <h2 className="font-bold text-white text-[max(5vw,18px)] sm:text-[max(4.5vw,20px)] md:text-[max(4vw,22px)] leading-tight">
          Food at your door in 30 minutes
        </h2>
        <p className="text-white text-[max(1.5vw,10px)] hidden sm:block md:text-[1vw]">
          Skip the wait and enjoy restaurant-quality meals delivered straight to
          you. Hot, fresh, and always on time — because great food shouldn't
          make you wait.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-transparent hover:bg-white hover:text-primary text-white font-semibold py-1.5 px-4 sm:py-[1vw] sm:px-[2.5vw] text-[max(1vw,11px)] sm:text-[max(1vw,13px)] rounded-full mt-1 sm:mt-2 transition-all duration-300 border-2 border-white"
        >
          View Menu →
        </button>
      </div>
    </div>
  );
};

export default Hero;
