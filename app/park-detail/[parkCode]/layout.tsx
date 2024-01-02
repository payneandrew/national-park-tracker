'use client';

import TabGroup from '../../components/tab-group';

interface ParkDetailsProps {
  children: React.ReactNode;
}

const ParkDetailsLayout: React.FC<ParkDetailsProps> = ({ children }) => {
  const tabs = [
    { name: 'Details', url: 'foo' },
    { name: 'Camping', url: 'bar' },
  ];
  return (
    <div className="p-4 md:p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
      <TabGroup tabs={tabs} />
      {children}
    </div>
  );
};

export default ParkDetailsLayout;
