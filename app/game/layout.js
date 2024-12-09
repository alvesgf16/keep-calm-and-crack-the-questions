import Header from './components/header';

export default function Layout({ children }) {
  return (
    <div style={{backgroundColor: 'black'}}>
      <Header />
      {children}
    </div>
  );
}
