import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Loander from '@/components/Loaner';

export default function Home() {
  return (
    <Container maxWidth="md">
      <header>
        <Box sx={{ py: 2, pt: 4 }}>Sparkasse Repayment Plan</Box>
      </header>
      <Box sx={{ py: 2 }}>
        <Stack spacing={4}>
          <Loander />
        </Stack>
      </Box>
      <header>
        <Box sx={{ py: 2, pt: 4 }}>Sparkasse Repayment Plan</Box>
      </header>
    </Container>
  );
}
