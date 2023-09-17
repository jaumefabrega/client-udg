import { useContext } from "react";
import cn from "classnames";
import { UserContext } from "@/context";
import { Logout as LogoutIcon } from "tabler-icons-react";

import { AppShell, Header, Footer, Text, Button } from "@mantine/core";
import Link from "next/link";
import { urls } from "@/constants";
import { useRouter } from "next/router";

import styles from "./basePage.module.scss";
import buttonStyles from "@/modules/evaluations/EditButtons/editButtons.module.scss";

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
        <Header
          className={styles.header}
          height={{ base: 36, md: 36 }}
          p="md"
          fixed
        >
          <div className={styles.headerInner}>
            <Link href="/">
              <img
                src="/images/logo-udg.png"
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
                  classNames={{
                    root: cn(buttonStyles.button),
                  }}
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
