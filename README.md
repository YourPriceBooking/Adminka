# Create React App - bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The application is not allowed to run through npm!!!!!

## Available Scripts - In the project directory, you can run:

- `yarn` installs all packages to node_modules from package.json and yarn.lock.
- `yarn add package` adds package dependencies.
- `yarn add -D package` adds package devDependencies.
- `yarn remove package` removes package from dependencies.

- `yarn start` Runs the app in the development mode. [http://localhost:3000](http://localhost:3000)
- `yarn test` - Launches the test runner in the interactive watch mode.
  [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
- `yarn build` - Builds the app for production to the `build` folder.

[deployment](https://facebook.github.io/create-react-app/docs/deployment)
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
[React documentation](https://reactjs.org/).

version 0.1.1

Порядок роботи з GitHub

1. Створюєте нову гілку від main: git checkout main git pull origin main git checkout -b
   feature/abc123

2. Робите зміни у своїй гілці git add . git commit -m "Короткий опис змін (ТЗ, задача тощо)"

3. Перед відправкою оновлюєте dev і робите rebase: git checkout main git pull origin main git
   checkout feature/abc123 git rebase main

4. Перевіряєте, що все працює:

- Код компілюється / білд збирається
- Зміни на місці

5. Відправляєте свою гілку в репозиторій: git push --force-with-lease origin feature/abc123

6. Створюєте Merge Request (Pull Request) у main

- У полі “Merge method” вибираєте “Squash and merge” Перейди на GitHub
- Відкрий репозиторій → вкладка Pull Requests (GitHub) або Merge Requests (GitLab)
- Натисни “New Pull Request” або “Create Merge Request”

- Після мерджу можна видалити свою гілку

```

```
