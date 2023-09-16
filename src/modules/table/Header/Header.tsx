import tableStyles from "@/styles/table.module.scss";
import styles from "./header.module.scss";
import cn from "classnames";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <div className={cn(styles.container, tableStyles.row, tableStyles.header)}>
      <div className={cn(tableStyles.column, tableStyles.firstColumn)}></div>
      <div className={tableStyles.column}>
        <div className={tableStyles.abpGroup}>Responsabilidad</div>
        <div className={tableStyles.abps}>
          <div className={tableStyles.abp}>Asitencia y puntualidad</div>
          <div className={tableStyles.abp}>Interés y motivación</div>
        </div>
      </div>
      <div className={tableStyles.column}>
        <div className={tableStyles.abpGroup}>Comunicación</div>
        <div className={tableStyles.abps}>
          <div className={tableStyles.abp}>Información</div>
          <div className={tableStyles.abp}>Interacción compañeros</div>
        </div>
      </div>
      <div className={tableStyles.column}>
        <div className={tableStyles.abpGroup}>Habilidades de aprendizaje</div>
        <div className={tableStyles.abps}>
          <div className={tableStyles.abp}>Estudio del caso</div>
          <div className={tableStyles.abp}>Fuentes de conocimiento</div>
          <div className={tableStyles.abp}>Análisis crítico</div>
        </div>
      </div>
      <div className={cn(tableStyles.finalGrade)}>
        Nota
        <br />
        final
      </div>
    </div>
  );
};
