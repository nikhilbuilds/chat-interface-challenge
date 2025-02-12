export const isValidApiKey = (key?: string): boolean => {
  return (
    typeof key === "string" && key.trim().length > 0 && key.startsWith("sk-")
  );
};
