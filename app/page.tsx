import Calculator from "../components/Calculator"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calculator></Calculator>
    </main>
  )
}
