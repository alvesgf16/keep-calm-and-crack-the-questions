import { GameContextProvider } from '../_contexts/game-context';
import Header from './components/header';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center space-x-4  min-h-screen">
      <GameContextProvider>
        <Header />
        {children}
      </GameContextProvider>
    </div>
  );
}
