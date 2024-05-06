import { IPill } from "./types";

const Pill: React.FC<IPill> = ({ title, color }) => {

    const bgColor = color ? color : "red"; 

//Aquí usé CSS porque con Tailwind por alguna razón el color de la pill no cambiaba a no ser que fuera rojo o azul.
    const pillStyle: React.CSSProperties = { 
        backgroundColor: bgColor,
        color: "white",
        padding: "6px",
        fontSize: "12px",
        fontWeight: "normal",
        lineHeight: "1.4",
        marginBottom: "5px",
        borderRadius: "5px",
        textTransform: "capitalize",
    };

    return (
        <div style={pillStyle}>
            {title}
        </div>
    );
};

export default Pill;


