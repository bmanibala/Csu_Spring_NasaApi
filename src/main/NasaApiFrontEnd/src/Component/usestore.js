import create from 'zustand';

const useStore = create(set => ({
  inputs: {
    date: '',
    fromDate: '',
    toDate: '',
    count: 1,
  },
  images: [],
  setInputs: (name, value) =>
    set(state => ({
      inputs: {
        ...state.inputs,
        [name]: value
      }
    })),
  setImages: images => set({ images }),
}));

export default useStore;