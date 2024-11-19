'use client';

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePaginationWrapper from '../components/pagination';

interface Artikel {
  id: string;
  judul: string;
  tanggal: string;
  body: string;
}

const columns = [
  { id: 'judul', label: 'Judul', minWidth: 170 },
  { id: 'tanggal', label: 'Tanggal', minWidth: 100 },
  { id: 'body', label: 'Body', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170 },
];

async function fetchArticles(): Promise<Artikel[]> {
  const res = await fetch('http://localhost:3000/artikel', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default function ManageArtikel() {
  const [data, setData] = useState<Artikel[]>([]);

  useEffect(() => {
    fetchArticles()
      .then((results: Artikel[]) => {
        setData(results);
      })
      .catch(() => {
        toast.error('Failed to fetch articles');
      });
  }, []);
  const handleDelete = async (row: Artikel) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        const response = await fetch(
          `http://localhost:3000/artikel/${row.id}`,
          {
            method: 'DELETE',
          }
        );
        if (!response.ok) {
          throw new Error('Gagal menghapus artikel');
        }
        toast.success('Artikel berhasil dihapus!');
        fetchArticles()
          .then((results: Artikel[]) => {
            setData(results);
          })
          .catch(() => {
            toast.error('Failed to fetch articles');
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        toast.error('Gagal menghapus artikel. Silakan coba lagi.');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        padding: '20px',
      }}
    >
      <Toaster position="bottom-right" />
      <Paper
        sx={{
          width: '80%',
          maxWidth: 1000,
          overflow: 'hidden',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
      >
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      backgroundColor: '#f0f0f0',
                      color: '#333',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#eaeaea' },
                  }}
                >
                  <TableCell>{row.judul}</TableCell>
                  <TableCell>
                    {new Date(row.tanggal).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.body}</TableCell>
                  <TableCell>
                    <form
                      method="POST"
                      action={`/manage-artikel/artikel-update/${row.id}`}
                      style={{ display: 'inline' }}
                    >
                      <button
                        type="submit"
                        style={{
                          marginRight: '10px',
                          padding: '5px 10px',
                          backgroundColor: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Update
                      </button>
                    </form>
                    <button
                      onClick={() => handleDelete(row)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePaginationWrapper
          totalRows={data.length}
          rowsPerPageOptions={[10, 25, 100]}
        />
      </Paper>
    </div>
  );
}
