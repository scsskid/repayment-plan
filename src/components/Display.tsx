// Todo: Types

type Props = {
  data: any[];
};
export default function Display({ data }: Props) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
