
import { Metadata } from "next"
import KelasTable from "../components/auth/Kelas-table";
export const metadata: Metadata ={
  title: "Artikel",
};
const ArtikelPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
    <div className="max-w-screen-md mx-auto py-10">
      <h1 className="text-2xl font-bold">
        List Kelas
      </h1>
      <KelasTable/>
    </div>
  </div>
  )
}

export default ArtikelPage
