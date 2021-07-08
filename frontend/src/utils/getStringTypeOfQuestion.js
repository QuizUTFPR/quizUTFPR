export default (type) => {
  switch (type) {
    case 'multiple_choice':
      return 'Múltipla Escolha';
    case 'singe_choice':
      return 'Escolha Única';
    default:
      return '';
  }
};
