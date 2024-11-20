import Agents from '../agent/AgentList';
import Sidebar from '../common/Sidebar';

function Home() {
  return (
    <div className="flex items-center dark:bg-[#060610] h-screen">
      <Sidebar />
      <main className="ml-[320px]">
        <Agents />
      </main>
    </div>
  );
}

export default Home;
