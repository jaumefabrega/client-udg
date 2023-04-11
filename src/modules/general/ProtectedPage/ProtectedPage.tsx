import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";

import { UserContext } from "@/context";
import Login from "@/modules/general/Login/Login";

interface Props {
  children: React.ReactNode;
}

const ProtectedPage: React.FC<Props> = ({ children }) => {
  const { user, userFetched } = useContext(UserContext);

  if (!userFetched) return null;
  if (!user) return <Login />;

  return <>{children}</>;
};

export default ProtectedPage;
