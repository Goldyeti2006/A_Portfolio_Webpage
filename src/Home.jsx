import CyclingText from "./CyclingText";
import './App.css';
export default function Home() {
    return (
      <div className="text-left p-6">
        <div className="h-20 mt-4 flex text-6xl items-center justify-center text-[#FF3831]">~~~~~</div>
        <CyclingText words={['Greetings', 'ご挨拶', 'Grüße' , 'ನಮಸ್ತೆ' , 'Salutations' , 'Приветствия']} className="text-8xl font-bold text-center" />
        <div className="grid-container mt-4 space-y-4">
            <div className="grid-item">Turning code into reality. Hey, I'm Goldyeti. I'm a developer who loves 3D, interactivity, and breaking the web (in a good way) </div>
            <div className="grid-item">2</div>
            <div className ="grid-item">3</div>
          <div className="grid-item">4</div>

        </div>
      </div>
    );
  }