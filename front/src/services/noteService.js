import axiosInterceptor from '@/utils/httpInterceptor';
const baseURL = import.meta.env.VITE_API_URL;

const addNote = async ({ noteToAdd }) => {
  let { data } = await axiosInterceptor.post(`${baseURL}notes`, noteToAdd);
  return data;
};

const deleteNote = async (noteIdToDelete) => {
  let { data } = await axiosInterceptor.delete(
    `${baseURL}remove-note/${noteIdToDelete}`
  );
  return data;
};

const updateNote = async ({ noteToUpdate, noteId }) => {
  let { data } = await axiosInterceptor.put(
    `${baseURL}update-note/${noteId}`,
    noteToUpdate
  );
  return data;
};

export default {
  updateNote,
  addNote,
  deleteNote,
};
