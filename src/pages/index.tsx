import MainHeader from "@/components/Header";
import Modal from "@/components/Modal";
import TradePage from "@/components/Trade";

export default function Home() {
  return (
    <main className="w-screen overflow-hidden duration-300 transition font-poppins">
      <MainHeader />
      <TradePage />
    </main>
  );
}
