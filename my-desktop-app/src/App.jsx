import CurrentState from './components/CurrentState';
import FloatingShape from './components/FloatingShape';
import HeroSection from './components/HeroSection';
import BypassTool from './pages/BypassTool'; // Adjust the path if necessary

function App() {
  return (
    <div
			className='mt-0 min-h-screen bg-gradient-to-br
    from-gray-900 via-blue-900 to-emerald-900 flex flex-col items-center justify-center relative overflow-hidden'
		>
			<FloatingShape color='bg-yellow-400' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-red-300' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-yello-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <HeroSection/>
      <CurrentState/>
      <BypassTool />
    </div>
  );
}

export default App;
