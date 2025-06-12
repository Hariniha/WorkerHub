import React from 'react';
import { 
  Wrench, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Settings, 
  TreePine 
} from 'lucide-react';

const iconMap = {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Settings,
  TreePine,
};

const SkillCard = ({ skill, name, selected, onClick }) => {
  const IconComponent = iconMap[skill] || Settings;

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105
        ${selected 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className={`
          p-3 rounded-full 
          ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
        `}>
          <IconComponent className="w-8 h-8" />
        </div>
        <span className={`
          font-medium 
          ${selected ? 'text-blue-700' : 'text-gray-700'}
        `}>
          {name}
        </span>
      </div>
    </button>
  );
};

export default SkillCard;
