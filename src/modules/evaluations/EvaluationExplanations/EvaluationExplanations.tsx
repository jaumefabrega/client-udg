import { Card, Text, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import styles from "./evaluationExplanations.module.scss";
import { evaluations } from "@/constants";
import { ChevronUp } from "tabler-icons-react";

import cn from "classnames";

const EvaluationExplanations = ({}) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.container}
    >
      <div className={styles.header}>
        <Text className={styles.title}>Competencias Personales</Text>
        <ChevronUp
          onClick={toggle}
          className={cn(styles.chevron, { [styles.closed]: !opened })}
        />
      </div>
      <Collapse in={opened}>
        <div className={styles.evaluationsList}>
          {evaluations.map((evaluation) => (
            <div className={styles.evaluation} key={evaluation.name}>
              {evaluation.icon({ size: 24, className: styles.icon })}
              <div>
                <Text className={styles.name}>{evaluation.name}</Text>
                <Text className={styles.explanation}>
                  {evaluation.explanation}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </Card>
  );
};

export default EvaluationExplanations;
