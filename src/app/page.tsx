import Form from '@/components/Form';
import Display from '@/components/Display';

import store from './storeObject';

export default function Home() {
  return (
    <main>
      <Form />
      <Display data={store} />
    </main>
  );
}
