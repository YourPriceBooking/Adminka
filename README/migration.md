### `2022-07-27 00:37`: How migration was done: from `bitbucket` to `github`.

```bash
cd pro/react/money/Adminka
git clone --mirror https://OchenashK@bitbucket.org/ceotravelvee/admin2.git .
git remote rm origin
git remote add origin https://github.com/YourPriceBooking/Adminka.git
git push --mirror
```
