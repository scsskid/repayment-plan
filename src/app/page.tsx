import Box from '@mui/material/Box';
import Form from '@/components/Form';
import Display from '@/components/Display';
import store from './storeObject';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

export default function Home() {
  return (
    <Container maxWidth="md">
      <header>
        <Box sx={{ py: 2, pt: 4 }}>Sparkasse Repayment Plan</Box>
      </header>
      <Box sx={{ py: 2 }}>
        <Stack spacing={4}>
          <Form />
          <Display data={store} />
        </Stack>
      </Box>
      <header>
        <Box sx={{ py: 2, pt: 4 }}>Sparkasse Repayment Plan</Box>
      </header>
    </Container>
  );
}
