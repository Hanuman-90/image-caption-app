const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

input.addEventListener("change", () => {
  const file = input.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
    result.innerText = "";
  }
});

async function uploadImage() {
  if (!input.files.length) {
    result.innerText = "Please upload an image first";
    return;
  }

  const formData = new FormData();
  formData.append("image", input.files[0]);

  result.innerText = "⏳ Generating caption...";

  const response = await fetch("https://BACKEND-URL-WILL-GO-HERE/caption", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  result.innerText = "📌 " + data.caption;
}
