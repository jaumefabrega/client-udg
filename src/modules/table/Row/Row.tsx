import { useContext } from "react";
import cn from "classnames";
import { NumberInput, Tooltip } from "@mantine/core";
import { UserContext } from "@/context";
import { AbpEvaluationExtended } from "@/interfaces";

import { ChatEvaluation } from "../ChatEvaluation/ChatEvaluation";

import tableStyles from "@/styles/taula.module.scss";
import rowSt from "./row.module.scss";

const numberInputProps = {
  max: 10,
  min: 0,
  precision: 1,
  hideControls: true,
  variant: "filled",
  styles: { input: { textAlign: "center" } },
  formatter: (value: string) => value.replace(/(.+)\.0$/g, "$1"),
  classNames: { input: rowSt.numberInput },
} as const;

const getAverageGrade = (evaluation: AbpEvaluationExtended) => {
  const asistencia = evaluation.asistencia || 0;
  const interes = evaluation.interes || 0;
  const informacion = evaluation.informacion || 0;
  const interaccion = evaluation.interaccion || 0;
  const estudio = evaluation.estudio || 0;
  const fuentes = evaluation.fuentes || 0;
  const analisis = evaluation.analisis || 0;

  const average =
    (asistencia +
      interes +
      informacion +
      interaccion +
      estudio +
      fuentes +
      analisis) /
    7;

  return String(Math.round(average * 10) / 10);
};

interface Props {
  abpEvaluation: AbpEvaluationExtended;
  setEvaluations: React.Dispatch<React.SetStateAction<AbpEvaluationExtended[]>>;
  disabled: boolean;
  rowIndex: number;
  isFirstOfKind: boolean;
}

export const Row: React.FC<Props> = ({
  abpEvaluation,
  setEvaluations,
  disabled,
  rowIndex,
  isFirstOfKind,
}) => {
  const handleChange = (key: keyof AbpEvaluationExtended, newValue: number) => {
    setEvaluations((prev) => {
      const currIdx = prev.findIndex((ev) => ev.id === abpEvaluation.id);
      return Object.assign([], prev, {
        [currIdx]: { ...prev[currIdx], [key]: newValue },
      });
    });
  };

  const { user } = useContext(UserContext);
  const isTeacher = user?.type === "teacher";
  const isStudent = user?.type === "student";
  const rowTitle = isTeacher ? (
    <div
      className={cn(rowSt.studentName, {
        [rowSt.isFirstStudent]: rowIndex === 0,
      })}
    >
      {abpEvaluation.student.name}
    </div>
  ) : (
    <div className={rowSt.weekNum}>Semana {abpEvaluation.abpOrder + 1}</div>
  );
  const inputsAreDisabled = isStudent ? true : disabled;
  const showChat = isTeacher ? true : !!abpEvaluation.chatTeacher1;
  const computedAvgGrade = getAverageGrade(abpEvaluation);

  return (
    <>
      {isFirstOfKind && isStudent && (
        <div
          className={cn(rowSt.separator, {
            [rowSt.firstSeparator]: rowIndex === 0,
          })}
        >
          <strong>{abpEvaluation.courseName}</strong>
        </div>
      )}
      <div
        className={cn(tableStyles.row, {
          [rowSt.isFirstRowOfCourse]: isFirstOfKind,
        })}
      >
        <div className={cn(tableStyles.column, tableStyles.firstColumn)}>
          <Tooltip label={rowTitle} openDelay={500}>
            <div>{rowTitle}</div>
          </Tooltip>
        </div>
        <div className={tableStyles.column}>
          <div className={tableStyles.abps}>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Asistencia y puntualidad</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.asistencia || ""}
                onChange={(value: number) => handleChange("asistencia", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Interés y motivación</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.interes || ""}
                onChange={(value: number) => handleChange("interes", value)}
                disabled={inputsAreDisabled}
              />
            </div>
          </div>
        </div>
        <div className={tableStyles.column}>
          <div className={tableStyles.abps}>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Información</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.informacion || ""}
                onChange={(value: number) => handleChange("informacion", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Interacción compañeros</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.interaccion || ""}
                onChange={(value: number) => handleChange("interaccion", value)}
                disabled={inputsAreDisabled}
              />
            </div>
          </div>
        </div>
        <div className={tableStyles.column}>
          <div className={tableStyles.abps}>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Estudio del caso</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.estudio || ""}
                onChange={(value: number) => handleChange("estudio", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Fuentes de conocimiento</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.fuentes || ""}
                onChange={(value: number) => handleChange("fuentes", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowSt.mobileHeader}>Análisis crítico</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.analisis || ""}
                onChange={(value: number) => handleChange("analisis", value)}
                disabled={inputsAreDisabled}
              />
            </div>
          </div>
        </div>
        <div className={tableStyles.column}>
          <div className={cn(tableStyles.abps, tableStyles.specialInfo)}>
            <div className={rowSt.final}>
              <div className={rowSt.mobileHeader}>Nota final</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.notaFinal || ""}
                onChange={(value: number) => handleChange("notaFinal", value)}
                disabled={inputsAreDisabled}
                placeholder={computedAvgGrade === "0" ? "" : computedAvgGrade}
              />
            </div>
            {showChat && (
              <ChatEvaluation
                abpEvaluation={abpEvaluation}
                setEvaluations={setEvaluations}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
