Hello 7;-)

2022-06-05, Decisions log:

- `front` 💻: React.js
- `back` 👨‍💻: Node.js
- `typification` 📑: `Typescript` (preferred) | JS + PropTypes
- `routing` 🚦: react-router v6
- `styles` 💅: `styled-components` (preferred) | scss modules | scss + bem

- state management:
  - global server state 🌄: (countries,contacts,posts) - `createApi` @reduxjs/toolkit | react-query
  - global user-defined state 🌳:
    - (auth 🔑) - `createAsyncThunk` + `createSlice` with extraReducers @reduxjs/toolkit
    - (theme ✨) - `createSlice` @reduxjs/toolkit
    - (lang 🌐, currency💱) - `createAsyncThunk` ??? undefined :D
  - local UI state 🦋: (showModal) - `useState` and react hooks
  - one reusable modal, which uses counter of opened modals in redux.
