import express from 'express';
import router from './routes';
import 'global-agent/bootstrap';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', router)

const port = 5001;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});


const world = 'world';

export function hello(who: string = world): string {
  console.log("hellooooo");
  
  return `Hello ${who}! `;
}

hello("jagan")