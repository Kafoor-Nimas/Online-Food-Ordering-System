import { heroSectionData } from "../assets/assets";

const Features = () => {
  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-2xl px-10 py-6 bg-white">
      {heroSectionData.hero_features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-xl">
              <feature.icon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {feature.title}
              </p>
              <p className="text-gray-500 text-xs">{feature.desc}</p>
            </div>
          </div>
          {index < heroSectionData.hero_features.length - 1 && (
            <div className="w-px h-10 bg-gray-200 ml-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Features;
