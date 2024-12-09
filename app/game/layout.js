import Header from './components/header';

export default function Layout({ children }) {
  return (
    <div className="flex items-center space-x-4 bg-green-400">
      <Header />
      {children}
    </div>
  );
}
