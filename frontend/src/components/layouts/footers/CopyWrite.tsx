import { FC } from "react";

const CopyWrite: FC = () => {
  return (
    <footer className="bg-blue-700 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default CopyWrite;
