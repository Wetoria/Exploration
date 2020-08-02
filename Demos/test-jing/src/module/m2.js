import { count, inc } from './m1';

export function incre() {
  console.log('before incre ', count);
  inc();
  console.log('after incre ', count);
}
