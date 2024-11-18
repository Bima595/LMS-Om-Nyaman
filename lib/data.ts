import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== 'admin')
    redirect('/dashboard');

  try {
    const user = await prisma.user.findMany();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getKelasByUser = async () => {
  const session = await auth();
  if (!session || !session.user)redirect('/dashboard');
const role = session.user.role;

  if (role === 'admin') {
    try {
      const user = await prisma.class.findMany();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
};


// Function to add a user to a class
export const addUserToClass = async (classId: string, userId: string) => {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'admin') {
      redirect('/dashboard');
    }
  
    try {
      // Check if the user is already in the class
      const existingUserClass = await prisma.userClass.findUnique({
        where: { userId_classId: { userId, classId } }
      });
  
      if (!existingUserClass) {
        // Add user to class
        const newUserClass = await prisma.userClass.create({
          data: {
            userId,
            classId,
            isJoined: true
          }
        });
        return newUserClass;
      } else {
        console.log('User is already in the class');
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const uploadTugas = async (
    classId: string,
    judul: string,
    deskripsi: string,
    fileUrl: string | null,
    startDate: Date,
    deadline: Date,
    userId: string
  ) => {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'admin') {
      redirect('/dashboard');
    }
  
    try {
      const newTugas = await prisma.tugas.create({
        data: {
          judul,
          deskripsi,
          fileUrl,
          startDate,
          deadline,
          userId,
          classId,
        }
      });
      return newTugas;
    } catch (error) {
      console.log(error);
    }
  };
