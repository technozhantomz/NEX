import counterpart from "counterpart";

type Props = {
  heading: string;
};

export const TableHeading = ({ heading }: Props): JSX.Element => {
  return (
    <>
      {counterpart.translate(`tableHead.${heading}`)}
    </>
  );
};
