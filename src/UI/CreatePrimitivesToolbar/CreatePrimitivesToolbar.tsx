import styles from "./CreatePrimitivesToolbar.module.css";
import { StateMode } from "../../engine/types";
import { useTertiusAxis } from "../hooks/useTertiusAxis";

export const CreatePrimitivesToolbar = () => {
  let primitivesNamesForButtons = [
    { text: "Cube", type: "BoxBufferGeometry", imgLink: "", active: true },
    {
      text: "Sphere",
      type: "SphereGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "Circle",
      type: "CircleBufferGeometry",
      imgLink: "",
      active: true,
    },
    { text: "Cone", type: "ConeBufferGeometry", imgLink: "", active: true },
    {
      text: "Cylinder",
      type: "CylinderBufferGeometry",
      imgLink: "",
      active: true,
    },
    { text: "Torus", type: "TorusBufferGeometry", imgLink: "", active: true },
    {
      text: "4-hedron",
      type: "TetrahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "8-hedron",
      type: "OctahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "12-hedron",
      type: "DodecahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    {
      text: "20-hedron",
      type: "IcosahedronBufferGeometry",
      imgLink: "",
      active: true,
    },
    { text: "Plane", type: "PlaneGeometry", imgLink: "", active: false },
    { text: "Ring", type: "RingBufferGeometry", imgLink: "", active: false },
    { text: "Shape", type: "ShapeBufferGeometry", imgLink: "" },
    { text: "Text", type: "TextBufferGeometry", imgLink: "", active: false },
    {
      text: "TorusKnot",
      type: "TorusKnotBufferGeometry",
      imgLink: "",
      active: false,
    },
    { text: "Tube", type: "TubeBufferGeometry", imgLink: "", active: false },
  ];

  const { changeAppState, stateValue } = useTertiusAxis(
    StateMode.ADD_PRIMITIVE
  );

  const onClickHadler = (type: string) => {
    changeAppState(StateMode.ADD_PRIMITIVE, { primitiveName: type });
  };

  return (
    <div className={styles.container}>
      Create Primitives
      <div className={styles.buttonsContainer}>
        {primitivesNamesForButtons.map((item) => (
          <div key={item.type}>
            <input
              type="radio"
              id={item.type}
              onChange={() => onClickHadler(item.type)}
              value={item.type}
              checked={item.type === stateValue?.primitiveName}
            />
            <label htmlFor={item.type}>{item.text}</label>
          </div>
        ))}
      </div>
      <div style={{ height: "300px" }}></div>
    </div>
  );
};
