import React from 'react';
import { Link } from 'react-router-dom';
import { skills } from '../data/mockData';
import SkillCard from '../components/SkillCard';
import Layout from '../components/Layout';

const SelectRole = () => {
  return (
    <Layout showBackButton showHomeButton title="Choose Your Skill">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            What service do you provide?
          </h2>
          <p className="text-gray-600">
            Select your primary skill to create your worker profile
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {skills.map((skill) => (
            <Link key={skill.id} to={`/worker-phone?skill=${skill.id}`}>
              <SkillCard
                skill={skill.icon}
                name={skill.name}
                onClick={() => { }}
              />
            </Link>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Why join WorkHub Local?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Get direct calls from nearby clients</li>
            <li>• No commission fees on your earnings</li>
            <li>• Build your local reputation</li>
            <li>• Work on your own schedule</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SelectRole;
