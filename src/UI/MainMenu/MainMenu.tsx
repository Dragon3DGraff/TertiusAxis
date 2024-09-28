import styles from "./MainMenu.module.css";

export const MainMenu = () => {
  return (
    <div className={styles.container}>
      <button>File</button>
      <button>Edit</button>
      <button>Settings</button>
      <button>Help</button>
      <p className={styles.title}>TertiusAxis</p>
    </div>
  );
};
