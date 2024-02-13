import { ReactNode, useState } from 'react';

interface Tab {
  name: string;
  component: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const TabGroup: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div>
      <ul className="flex justify-around mb-4">
        {tabs.map(({ name }) => (
          <li
            key={name}
            className={`mr-1 cursor-pointer ${
              activeTab === name
                ? 'text-coffee-brown border-b-2 border-green-600'
                : ''
            }`}
            onClick={() => setActiveTab(name)}
          >
            <p className="block py-2 px-4 font-bold">{name}</p>
          </li>
        ))}
      </ul>
      {tabs.map(({ name, component }) => {
        if (name === activeTab) {
          return component;
        }
      })}
    </div>
  );
};

export default TabGroup;
