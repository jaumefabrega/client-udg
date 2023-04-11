import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
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
import { useQuery } from "react-query";

import { UserContext } from "@/context";

import authApi from "@/services/auth.api";
import { User } from "@/interfaces";
import styles from "./login.module.scss";

export default function Login() {
  const schema = Yup.object().shape({
    email: Yup.string().email("Email incorrecto").required("Obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Obligatorio"),
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  const { login } = useContext(UserContext);

  const [enableLoginQuery, setEnableLoginQuery] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>(
    ["login", form.values],
    () => authApi.login(form.values),
    {
      refetchOnWindowFocus: false,
      enabled: enableLoginQuery, // disable this query from automatically running
      retry: false,
      retryOnMount: false,
      onSuccess: (newUser) => {
        setEnableLoginQuery(false);
        login(newUser);
      },
      onError: () => {
        setShowErrorModal(true);
        setEnableLoginQuery(false);
      },
    }
  );

  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    const formValidation = form.validate();
    if (!formValidation.hasErrors) {
      setEnableLoginQuery(true);
    }
    event.preventDefault();
  };

  if (isLoading) {
    console.log("loading...");
  }

  if (isError) {
    console.log("ERROR:", error.message);
  }

  if (user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LOGIN</h1>
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
        className={styles.card}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            required
            label="Email"
            placeholder="email"
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
}
