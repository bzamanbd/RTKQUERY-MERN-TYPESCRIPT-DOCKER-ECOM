import { FC, ReactNode } from "react";
import PrimaryHeader from "./headers/PrimaryHeader";

const SecondaryLayout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div>
      <PrimaryHeader/>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default SecondaryLayout;
