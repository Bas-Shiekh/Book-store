import app from './app';

const port = app.get('port');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port http://localhost:${port}`);
});
