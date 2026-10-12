export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Sannu da asuba';
  if (hour < 18) return 'Sannu da rana';
  return 'Sannu da yamma';
};
