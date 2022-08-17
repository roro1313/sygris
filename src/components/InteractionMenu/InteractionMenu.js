import { SpeedDial, SpeedDialAction } from "@mui/material";
const InteractionMenu = (props) => {
  const actions = [
    {
      name: "Añadir nodo",
      icon: "➕",
      onClick: () => {
        props.setAddingMode(true);
      },
    },
    {
      name: "Editar nodo",
      icon: "✏️",
      onClick: () => {
        alert("Editar nodo");
      },
    },
    {
      name: "Borrar nodo",
      icon: "🗑️",
      onClick: () => {
        props.setDeletingMode(true);
      },
    },
  ];

  return (
    <SpeedDial
      ariaLabel="Menú de interacción"
      sx={{ position: "absolute", bottom: 20, right: 20 }}
      icon={"👆🏻"}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
          variant={"dark"}
        />
      ))}
    </SpeedDial>
  );
};

export default InteractionMenu;
