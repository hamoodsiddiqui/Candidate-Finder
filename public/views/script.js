document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const response = await fetch(this.action, {
      method: this.method,
      body: formData,
    });

    const result = await response.json();
    document.getElementById("uploadResult").innerText = JSON.stringify(
      result,
      null,
      2
    );
  });
