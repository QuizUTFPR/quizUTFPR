export default (type) => {
  switch (type) {
    case 'multipleChoice':
      return 'Múltipla Escolha';
    case 'singleChoice':
      return 'Escolha Única';
    default:
      return '';
  }
};
