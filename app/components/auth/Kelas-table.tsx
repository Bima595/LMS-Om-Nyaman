import { getKelasByUser } from '@/lib/data';

const KelasTable = async () => {
  const kelas = await getKelasByUser();

  if (!kelas?.length) return <h1 className="text-2xl">Tidak Terdapat Kelas</h1>;

  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Nama Kelas</th>
          <th className="py-3 px-6 text-left text-sm">Semester</th>
          <th className="py-3 px-6 text-left text-sm">Hari</th>
          <th className="py-3 px-6 text-left text-sm">Jam di Laksanakan</th>
          <th className="py-3 px-6 text-left text-sm">Users</th>
          <th className="py-3 px-6 text-left text-sm">Files</th>
        </tr>
      </thead>
      <tbody>
        {kelas.map((kelas) => (
          <tr key={kelas.id}>
            <td className="py-3 px-6">{kelas.nama}</td>
            <td className="py-3 px-6">{kelas.deskripsi}</td>
            <td className="py-3 px-6">{kelas.hari}</td>
            <td className="py-3 px-6">{kelas.jamKelas}</td>
            <td className="py-3 px-6">
              {(kelas.users ?? []).map((user) => (
                <span key={user.id}>{user.userId}</span>
              ))}
            </td>
            <td className="py-3 px-6">
              {(kelas.files ?? []).map((file) => (
                <a key={file.id} href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.url}
                </a>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KelasTable;
