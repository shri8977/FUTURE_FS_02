function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow transition 
    ${type === "error" ? "bg-red-600" : "bg-green-600"} text-white`;

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}
