export const useGetRecoveryPassword = (password: string): void => {
  const element = document.createElement("a");
  const file = new Blob([password], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = "password.txt";
  document.body.appendChild(element);
  element.click();
};
