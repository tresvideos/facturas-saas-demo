import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Facturas Demo',
  description: 'Genera y descarga facturas en PDF — demo sin pagos reales'
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="es">
      <body>
        <Header/>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
