import { USStates } from '@/mocks/states';
import Head from 'next/head';
import Parks from '../../components/parks';
export const dynamic = 'force-dynamic';

const StatePage = async ({ params }: { params: { stateCode: string } }) => {
  const stateCode = params.stateCode;

  return (
    <div>
      <Head>
        <title>{`${stateCode} Parks`}</title>
        <meta
          name="description"
          content="Explore national parks and plan your visits."
        />
      </Head>

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold m-4 text-white">{`${
          USStates[stateCode as keyof typeof USStates]
        } Parks`}</h1>
        <Parks stateCode={stateCode} />
      </div>
    </div>
  );
};

export default StatePage;
