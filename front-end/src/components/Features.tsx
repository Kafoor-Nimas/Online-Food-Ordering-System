import { heroSectionData } from "../assets/assets";

const Features = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-gray-200 rounded-2xl px-4 sm:px-6 md:px-10 py-4 sm:py-6 bg-white">
      {heroSectionData.hero_features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="p-2 sm:p-3 bg-gray-100 rounded-xl shrink-0">
            <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-xs sm:text-sm">
              {feature.title}
            </p>
            <p className="text-gray-500 text-xs hidden sm:block">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
