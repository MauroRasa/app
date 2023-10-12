// navigationUtils.js
let currentComponent = 'Componente1';

export const setCurrentComponent = (componentName) => {
  currentComponent = componentName;
};

export const getCurrentComponent = () => {
  return currentComponent;
};
