import "./BrijsButton.css";

export const BrijsButton = ({ text }: { text: string }) => {
  return (
    <button className="button-85" role="button">
      {text}
    </button>
  );
};
