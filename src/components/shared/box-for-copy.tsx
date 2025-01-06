import { Button } from "../atoms/button";

const BoxForCopy = ({ value }: { value: string }) => {
  const copyVaNumber = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex items-center justify-between bg-background py-2 px-4 rounded-md border border-border mt-1">
      <span className="text-sm font-medium">{value}</span>
      <Button
        onClick={() => copyVaNumber(value)}
        className="text-sm font-semibold"
      >
        Copy
      </Button>
    </div>
  );
};

export default BoxForCopy;
