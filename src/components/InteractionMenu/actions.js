const actions = [
  {
    name: "Añadir nodo",
    icon: "➕",
    onClick: () => {
      alert("Añadir nodo");
    },
  },
  {
    name: "Editar nodo 'en desarrollo'",
    icon: "✏️",
    onClick: () => {
      alert("Editar nodo");
    },
  },
  {
    name: "Borrar nodo 'en desarrollo'",
    icon: "🗑️",
    onClick: () => {
      alert("Borrar nodo");
    },
  },
];

export default actions;
