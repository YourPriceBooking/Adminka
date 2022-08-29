Folder structure:

```text
v src
    1️⃣ api
  v 2️⃣ assets
        > fonts
        > icons
        > img
    3️⃣ components
    4️⃣ hooks
    5️⃣ i18n
    6️⃣ pages
  v 7️⃣ redux
        > apis
        > reducers
        > slices
    8️⃣ routes
    9️⃣ styles
    🔟 types
    11️ utils
```

`2022-08-14 20:10`

```text
v 1️⃣ src
      > index.tsx: Entry point
v 2️⃣ app
      > store.ts
      > rootReducer.ts
      > App.tsx
v 3️⃣ common
      > hooks
      > generic components
      > utils
v 4️⃣ features
      v languages
        > languagesApi.ts
        > languagesSlice.ts
        > Languages.tsx
      v countries
        > countriesApi.ts
        > countriesSlice.ts
        > Countries.tsx
      v states
        > statesApi.ts
        > States.tsx
      v cities
        > citiesApi.ts
        > Cities.tsx
      v districts
        > districtsApi.ts
        > Districts.tsx
      v modal
        > modalSlice.ts
        > Modal.tsx
```
