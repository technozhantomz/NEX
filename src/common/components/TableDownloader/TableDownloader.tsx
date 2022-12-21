import counterpart from "counterpart";
import { ReactInstance, RefObject, useCallback } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { DownloadOutlined } from "../../../ui/src";

import * as Styled from "./TableDownloader.styled";

type Props = {
  componentRef: RefObject<HTMLDivElement>;
  data?: object[];
};

export const TableDownloader = ({ componentRef, data }: Props): JSX.Element => {
  const handlePdfTrigger = useCallback(() => {
    return (
      <Styled.PdfDownloadLink>
        {counterpart.translate(`links.pdf`)}
      </Styled.PdfDownloadLink>
    );
  }, []);
  const renderPdfContent = useCallback(() => {
    return componentRef.current as unknown as ReactInstance;
  }, [componentRef]);
  return (
    <Styled.DownloadLinks>
      <DownloadOutlined />
      <ReactToPrint trigger={handlePdfTrigger} content={renderPdfContent} />

      {` / `}
      <CSVLink
        filename={"WitnessesTable.csv"}
        data={data ?? []}
        className="btn btn-primary"
      >
        {counterpart.translate(`links.csv`)}
      </CSVLink>
    </Styled.DownloadLinks>
  );
};
