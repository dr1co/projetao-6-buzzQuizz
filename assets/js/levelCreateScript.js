function getInputsAndVerify() {
  const levelTitles = document.getElementsByName("level-title");
  const levelAccurates = document.getElementsByName("level-accurate");
  const levelImages = document.getElementsByName("level-image");
  const levelDescriptions = document.getElementsByName("level-description");

  verifyTitles(levelTitles);
  verifyMinValue(levelAccurates);
  verifyImagesUrl(levelImages);
  verifyDescriptions(levelDescriptions);

  saveLevelData();
}

function verifyTitles(levelTitles) {
  levelTitles.forEach((title) => {
    if (title.value.length < 10) {
      setLabelWarning(title);

      throw new Error();
    }
  });
}

function verifyMinValue(levelAccurates) {
  levelAccurates.forEach((accurate) => {
    if (
      !accurate.value ||
      Number(accurate.value) < 0 ||
      Number(accurate.value) > 100
    ) {
      setLabelWarning(accurate);

      throw new Error();
    }
  });
}

function verifyImagesUrl(levelImages) {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  levelImages.forEach((url) => {
    if (url.value.search(regex) < 0 || !url.value) {
      setLabelWarning(url);
    }
  });
}

function verifyDescriptions(levelDescriptions) {
  levelDescriptions.forEach(description => {
    if (description.value.length < 30) {
      setLabelWarning(description);

      throw new Error();
    }
  })
}

function saveLevelData() {
  const inputs = document.querySelectorAll("[data-level].inputs");

  const quizzObjectCreationRequest = JSON.parse(
    localStorage.getItem("quizzObjectCreationRequest")
  );

  const levels = [];

  inputs.forEach((input) => {
    const obj = {
      title: input.childNodes[1].value,
      minValue: input.childNodes[3].value,
      image: input.childNodes[5].value,
      text: input.childNodes[7].value,
    };

    levels.push(obj);
  });

  quizzObjectCreationRequest.levels = levels;

  localStorage.setItem(
    "quizzObjectCreationRequest",
    JSON.stringify(quizzObjectCreationRequest)
  );
}

function createLevelsInputs() {
  const { numberLevels } = JSON.parse(
    localStorage.getItem("quizzConfigObject")
  );

  const levels = document.getElementById("levels");

  for (let i = 1; i <= numberLevels; i++) {
    levels.innerHTML += levelTemplate(i);
  }
}

function levelTemplate(levelIndex) {
  return `<div class="level">
             <span class="default-title">Nível ${levelIndex}</span>
             <div data-level="nivel${levelIndex}" class="inputs default-input-group-width flex flex-direction-column justify-content-center align-items-center">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-title" type="text" placeholder="Título do nível">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-accurate" type="text" placeholder="% de acerto mínima">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-image" type="text" placeholder="URL da imagem do nível">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-description" type="text" placeholder="Descrição do nível">
             </div>
          </div>`;
}
