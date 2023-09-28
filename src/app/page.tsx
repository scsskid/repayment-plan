import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Loaner from '@/components/Loaner';

export default function Home() {
  return (
    <Container maxWidth="md">
      <header>
        <Box sx={{ py: 2, pt: 4 }}>S-Com Repayment Plan</Box>
      </header>
      <Box sx={{ py: 2 }}>
        <Stack spacing={4}>
          <Loaner />
        </Stack>
      </Box>
      <header>
        <Box sx={{ py: 2, pt: 4 }}>S-Com Repayment Plan</Box>
      </header>
    </Container>
  );
}
