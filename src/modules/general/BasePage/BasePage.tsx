import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";

import { UserContext } from "@/context";
import { Logout as LogoutIcon } from "tabler-icons-react";

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { urls } from "@/constants";
import { useRouter } from "next/router";

import styles from "./basePage.module.scss";

interface Props {
  children: React.ReactNode;
}

const BasePage: React.FC<Props> = ({ children }) => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  return (
    <AppShell
      className={styles.container}
      classNames={{ main: styles.main }}
      fixed={false}
      footer={
        <Footer
          height={60}
          p="md"
          style={{
            backgroundColor: "transparent",
            borderTopWidth: 0,
            color: "#FFF",
            textShadow: "0px 0px 10px black",
          }}
        >
          ayuda@masterUDG.es
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md" fixed>
          <div className={styles.headerInner}>
            <Link href="/">
              <img
                src="/images/logo-udg-wide.png"
                // width={70}
                // height={48}
                alt="Logo UDG"
                className={styles.logo}
              />
            </Link>
            {user && (
              <>
                <Text className={styles.user}>{user.email}</Text>
                <Button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  variant="light"
                  size="xs"
                  rightIcon={<LogoutIcon />}
                >
                  Cerrar Sesión
                </Button>
              </>
            )}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default BasePage;
