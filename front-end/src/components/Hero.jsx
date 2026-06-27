import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${assets.header_img})` }}
      className="h-[34vw] my-8 mt-30 mx-6 md:mx-16 lg:mx-24 xl:mx-38  rounded-2xl bg-no-repeat bg-cover bg-center relative max-w-[1200px]"
    >
      <div className="absolute bottom-[10%] left-[6vw] flex flex-col items-start gap-[1.5vw] max-w-[50%]">
        <h2 className="font-bold text-white text-[max(4.5vw,22px)] leading-tight">
          Food at your door in 30 minutes
        </h2>
        <p className="text-white text-[1vw] hidden md:block">
          Skip the wait and enjoy restaurant-quality meals delivered straight to
          you. Hot, fresh, and always on time — because great food shouldn't
          make you wait.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-transparent hover:bg-white hover:text-primary text-white font-semibold py-[1vw] px-[2.5vw] text-[max(1vw,13px)] rounded-full mt-2 transition-all duration-300 border-2 border-white"
        >
          View Menu →
        </button>
      </div>
    </div>
  );
};

export default Hero;
