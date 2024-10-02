
import Assistants from '../components/agentSetup/agentList';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <div className="flex items-center dark:bg-[#060610] h-screen">
      <Sidebar/>
     <main className='ml-[320px]'>
      <Assistants/>
     </main>
    </div>
  );
}

export default Home;
