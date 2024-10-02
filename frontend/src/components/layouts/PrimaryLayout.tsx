import { FC, ReactNode } from "react";
import PrimaryHeader from "./headers/PrimaryHeader";
import PrimaryFooter from "./footers/PrimaryFooter";

const PrimaryLayout: FC<{children: ReactNode}> = ({ children }) => {
  return <> 
    <PrimaryHeader/>
      {children}
    <PrimaryFooter/>
  </>
};

export default PrimaryLayout;
