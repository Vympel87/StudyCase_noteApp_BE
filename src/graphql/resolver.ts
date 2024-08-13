import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    notes: async () => {
      const notes = await prisma.note.findMany();
      return notes.map(note => ({
        ...note,
        createdAt: note.createdAt.toISOString().split('T')[0], 
        updatedAt: note.updatedAt.toISOString().split('T')[0], 
      }));
    },
    note: async (_: any, { id }: { id: number }) => {
      const note = await prisma.note.findUnique({
        where: { id },
      });
      return note
        ? {
            ...note,
            createdAt: note.createdAt.toISOString().split('T')[0],
            updatedAt: note.updatedAt.toISOString().split('T')[0],
          }
        : null;
    },
  },
  Mutation: {
    createNote: async (_: any, { title, body }: { title: string, body: string }) => {
      const newNote = await prisma.note.create({
        data: { title, body },
      });
      return {
        ...newNote,
        createdAt: newNote.createdAt.toISOString(),
        updatedAt: newNote.updatedAt.toISOString(),
      };
    },
    updateNote: async (_: any, { id, title, body }: { id: number, title?: string, body?: string }) => {
      const updatedNote = await prisma.note.update({
        where: { id },
        data: { title, body },
      });
      return {
        ...updatedNote,
        createdAt: updatedNote.createdAt.toISOString(),
        updatedAt: updatedNote.updatedAt.toISOString(),
      };
    },
    deleteNote: async (_: any, { id }: { id: number }) => {
      return prisma.note.delete({
        where: { id },
      });
    },
  },
};
