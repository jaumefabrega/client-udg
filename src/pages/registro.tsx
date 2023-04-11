import Head from "next/head";
import { UserContext } from "@/context";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import {
  Box,
  Button,
  Card,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "react-query";
import authApi from "@/services/auth.api";
import { GetServerSideProps, NextPage } from "next/types";
import { User } from "@/interfaces";

import styles from "@/modules/general/Login/login.module.scss";
interface Props {
  email: string;
  name: string;
  registrationUUID: string;
}

export const Register: NextPage<Props> = ({ email, registrationUUID }) => {
  const schema = Yup.object().shape({
    email: Yup.string().email("Email incorrecto").required("Obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Obligatorio"),
  });

  const form = useForm({
    initialValues: {
      email,
      password: "",
    },
    validate: yupResolver(schema),
  });

  const { login } = useContext(UserContext);
  const router = useRouter();

  const [enableRegisterQuery, setEnableRegisterQuery] = useState(false);

  // Queries
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>(
    ["confirmUser", form.values],
    () => authApi.confirmUser(form.values.password, registrationUUID),
    {
      refetchOnWindowFocus: false,
      enabled: enableRegisterQuery, // disable this query from automatically running
      retry: false,
      retryOnMount: false,
      onSuccess: (newUser) => {
        setEnableRegisterQuery(false);
        login(newUser);
      },
      onError: () => {
        setShowErrorModal(true);
        setEnableRegisterQuery(false);
      },
    }
  );

  const [showErrorModal, setShowErrorModal] = useState(false);

  if (isLoading) {
    console.log("loading...");
  }

  if (isError) {
    console.log("ERROR:", error.message);
  }

  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    const formValidation = form.validate();
    if (!formValidation.hasErrors) {
      setEnableRegisterQuery(true);
    }
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrarse</h1>
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
        className={styles.card}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            label="Email"
            placeholder="email"
            disabled
            className={styles.input}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            placeholder="Contraseña"
            label="Contraseña"
            withAsterisk
            className={styles.input}
            {...form.getInputProps("password")}
          />
          <Button type="submit" loading={isLoading} className={styles.button}>
            Entrar
          </Button>
        </form>
      </Card>
      <Modal
        opened={showErrorModal}
        overlayProps={{ opacity: 0.55, blur: 3 }}
        onClose={() => {
          setShowErrorModal(false);
        }}
        title="Uups, ha habido un error"
        centered
        styles={{
          title: { fontWeight: 700 },
        }}
      >
        {error?.message}
      </Modal>
    </div>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { registrationUUID } = query;

  const stringUUID = Array.isArray(registrationUUID)
    ? registrationUUID[0]
    : registrationUUID;

  const user = await authApi.getUserToConfirm(stringUUID || "");

  if (!user) {
    return {
      notFound: true,
    };
  }

  return { props: { name: user.name, email: user.email, registrationUUID } };
};
