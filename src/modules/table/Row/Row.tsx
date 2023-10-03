import { useContext } from "react";
import cn from "classnames";
import { NumberInput, Tooltip } from "@mantine/core";
import { UserContext } from "@/context";
import { AbpEvaluationExtended } from "@/interfaces";

import { ChatEvaluation } from "../ChatEvaluation/ChatEvaluation";

import tableStyles from "@/styles/table.module.scss";
import rowStyles from "./row.module.scss";

const numberInputProps = {
  max: 10,
  min: 0,
  precision: 1,
  hideControls: true,
  variant: "filled",
  styles: { input: { textAlign: "center" } },
  formatter: (value: string) => value.replace(/(.+)\.0$/g, "$1"),
  classNames: { input: rowStyles.numberInput },
} as const;

const getAverageGrade = (evaluation: AbpEvaluationExtended) => {
  const asistencia = evaluation.asistencia;
  const interes = evaluation.interes;
  const informacion = evaluation.informacion;
  const interaccion = evaluation.interaccion;
  const estudio = evaluation.estudio;
  const fuentes = evaluation.fuentes;
  const analisis = evaluation.analisis;

  if (
    asistencia === null ||
    interes === null ||
    informacion === null ||
    interaccion === null ||
    estudio === null ||
    fuentes === null ||
    analisis === null
  ) {
    return "";
  }

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
  isTeacherOfThisAbp: boolean;
}

export const Row: React.FC<Props> = ({
  abpEvaluation,
  setEvaluations,
  disabled,
  rowIndex,
  isFirstOfKind,
  isTeacherOfThisAbp,
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
      className={cn(rowStyles.studentName, {
        [rowStyles.isFirstStudent]: rowIndex === 0,
      })}
    >
      {abpEvaluation.student.name}
    </div>
  ) : (
    <div className={rowStyles.weekNum}>ABP {abpEvaluation.abpOrder + 1}</div>
  );
  const inputsAreDisabled = isStudent ? true : disabled;
  const showChat = isTeacher ? true : !!abpEvaluation.chatTeacher1;
  const computedAvgGrade = getAverageGrade(abpEvaluation);

  return (
    <>
      {isFirstOfKind && isStudent && (
        <div
          className={cn(rowStyles.separator, {
            [rowStyles.firstSeparator]: rowIndex === 0,
          })}
        >
          <strong>{abpEvaluation.courseName}</strong>
        </div>
      )}
      <div
        className={cn(tableStyles.row, {
          [rowStyles.isFirstRowOfCourse]: isFirstOfKind,
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
              <div className={rowStyles.mobileHeader}>
                Asistencia y puntualidad
              </div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.asistencia ?? ""}
                onChange={(value: number) => handleChange("asistencia", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowStyles.mobileHeader}>Interés y motivación</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.interes ?? ""}
                onChange={(value: number) => handleChange("interes", value)}
                disabled={inputsAreDisabled}
              />
            </div>
          </div>
        </div>
        <div className={tableStyles.column}>
          <div className={tableStyles.abps}>
            <div className={tableStyles.abp}>
              <div className={rowStyles.mobileHeader}>Información</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.informacion ?? ""}
                onChange={(value: number) => handleChange("informacion", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowStyles.mobileHeader}>
                Interacción compañeros
              </div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.interaccion ?? ""}
                onChange={(value: number) => handleChange("interaccion", value)}
                disabled={inputsAreDisabled}
              />
            </div>
          </div>
        </div>
        <div className={tableStyles.column}>
          <div className={tableStyles.abps}>
            <div className={tableStyles.abp}>
              <div className={rowStyles.mobileHeader}>Estudio del caso</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.estudio ?? ""}
                onChange={(value: number) => handleChange("estudio", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowStyles.mobileHeader}>
                Fuentes de conocimiento
              </div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.fuentes ?? ""}
                onChange={(value: number) => handleChange("fuentes", value)}
                disabled={inputsAreDisabled}
              />
            </div>
            <div className={tableStyles.abp}>
              <div className={rowStyles.mobileHeader}>Análisis crítico</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.analisis ?? ""}
                onChange={(value: number) => handleChange("analisis", value)}
                disabled={inputsAreDisabled}
              />
            </div>
          </div>
        </div>
        <div className={tableStyles.column}>
          <div className={cn(tableStyles.abps, tableStyles.specialInfo)}>
            <div className={rowStyles.final}>
              <div className={rowStyles.mobileHeader}>Nota final</div>
              <NumberInput
                {...numberInputProps}
                value={abpEvaluation.notaFinal ?? ""}
                onChange={(value: number) => handleChange("notaFinal", value)}
                disabled={true}
                placeholder={computedAvgGrade}
              />
            </div>
            {showChat && (
              <ChatEvaluation
                abpEvaluation={abpEvaluation}
                setEvaluations={setEvaluations}
                isTeacherOfThisAbp={isTeacherOfThisAbp}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
