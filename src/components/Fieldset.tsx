import Box from '@mui/material/Box';

type Props = {
  children: React.ReactNode;
  legend: string;
};

export default function Fieldset({ children, legend = 'Untitled' }: Props) {
  return (
    <Box component="fieldset">
      <legend>{legend}</legend>
      {children}
    </Box>
  );
}
