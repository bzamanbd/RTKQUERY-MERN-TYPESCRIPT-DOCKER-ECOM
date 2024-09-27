import { FC, ReactNode } from "react";
import PrimaryHeader from "./headers/PrimaryHeader";
import PrimaryFooter from "./footers/PrimaryFooter";

const PrimaryLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div>
      <PrimaryHeader/>

      <div className="content">
        {children}
      </div>
      
      <PrimaryFooter/>
    </div>
  );
};

export default PrimaryLayout;
